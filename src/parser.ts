// src/parser.ts
import { AstNode, BaseNode, ComponentType, PageNode } from './types';

// 正则表达式用于解析一行DSL
const lineRegex = /^(?<indent>\s*)(?<type>\w+)(?:\s+(?<id>\w+))?(?:\s+"(?<content>.*?)")?(?:\s*->\s*(?<action>\S+))?(?:\s*{(?<props>.*?)})?$/;

// 类型守卫：检查字符串是否是合法的 ComponentType
function isComponentType(value: string): value is ComponentType {
  return Object.values(ComponentType).includes(value as ComponentType);
}

function parseProperties(propString: string | undefined): Record<string, any> {
  if (!propString) return {};
  const props: Record<string, any> = {};
  
  // 支持数组和普通属性的正则表达式
  const propRegex = /(\w+):\s*(?:\[([^\]]+)\]|"([^"]+)"|([^,}]+))/g;
  let match;
  
  while ((match = propRegex.exec(propString)) !== null) {
    const key = match[1];
    const arrayValue = match[2]; // [value1, value2, ...]格式
    const stringValue = match[3]; // "value"格式  
    const plainValue = match[4]; // value格式
    
    if (arrayValue) {
      // 解析数组：["item1", "item2", "item3"]
      const items = arrayValue.split(',').map(item => 
        item.trim().replace(/^["']|["']$/g, '') // 去掉引号和空白
      );
      props[key] = items;
    } else if (stringValue) {
      props[key] = stringValue;
    } else if (plainValue) {
      props[key] = plainValue.trim();
    }
  }
  
  return props;
}

export function parse(code: string): PageNode[] {
  const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));
  const pages: PageNode[] = [];
  const stack: BaseNode[] = [];

  for (const line of lines) {
    const match = line.match(lineRegex);
    if (!match || !match.groups) continue;

    const { indent, type, id, content, action, props } = match.groups;
    
    // 使用类型守卫进行验证
    if (!isComponentType(type)) {
      console.warn(`[Parser Warning] Skipping unknown component type: "${type}"`);
      continue;
    }

    // 创建基础节点数据，使用更灵活的类型
    const node: BaseNode = {
      type: type, // 现在类型是安全的，因为已经通过 isComponentType 验证
      identifier: id,
      properties: parseProperties(props),
      children: [],
    };

    // 添加内容属性（对于文本类型节点）
    if (content) {
      (node as any).content = content;
    }
    
    // 添加动作属性
    if (action) {
      // 改进的动作解析
      let actionType: 'navigate' | 'alert' | 'submit' = 'submit'; // 默认
      let target = '';

      if (action.startsWith('/')) {
        actionType = 'navigate';
        target = action;
      } else if (action.toLowerCase() === 'submit') {
        actionType = 'submit';
      } else {
        const alertMatch = action.match(/^alert\("?(.*?)"?\)$/);
        if (alertMatch) {
          actionType = 'alert';
          target = alertMatch[1];
        }
      }
      
      if(actionType) {
        (node as any).action = { type: actionType, target: target };
      }
    }

    if (node.type === ComponentType.Page) {
      (node as PageNode).name = id || 'unnamed';
      pages.push(node as PageNode);
      // 重置并设置新的页面栈
      stack.splice(0, stack.length, node);
      continue;
    }
    
    // 基于缩进的层级管理，更稳健
    const currentIndent = indent?.length || 0;
    // 假设每级缩进为4个空格，可以设为2或其它
    const indentLevel = Math.floor(currentIndent / 4);

    // 回退栈直到找到正确的父节点
    while (stack.length > indentLevel + 1) {
      stack.pop();
    }
    
    const parent = stack[stack.length - 1];
    if (parent) {
      parent.children.push(node as AstNode);
    } else {
        // 如果没有父节点且不是Page，说明是根级别的无效节点
        console.warn(`[Parser Warning] Ignoring root-level component without page: "${type}"`);
        continue;
    }
    
    // 如果节点可以有子节点, 则压入栈中
    if ([ComponentType.Container, ComponentType.Form, ComponentType.Page].includes(node.type)) {
        stack.push(node);
    }
  }

  return pages;
}