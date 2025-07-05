// src/types.ts

// 定义组件的类型词汇表
export enum ComponentType {
  Page = 'page',
  Container = 'container',
  Form = 'form',
  Header = 'header',
  Text = 'text',
  Image = 'image',
  Link = 'link',
  Input = 'input',
  Button = 'button',
  Select = 'select',
}

// 定义动作的类型
export interface Action {
  type: 'navigate' | 'submit' | 'alert';
  target: string;
}

// 定义所有节点的通用属性
export interface BaseNode {
  type: ComponentType;
  identifier?: string;
  properties: Record<string, any>;
  children: AstNode[];
}

// 定义具体的组件节点类型
export interface PageNode extends BaseNode {
  type: ComponentType.Page;
  name: string;
}

export interface ContainerNode extends BaseNode {
  type: ComponentType.Container;
}

export interface FormNode extends BaseNode {
  type: ComponentType.Form;
}

export interface TextNode extends BaseNode {
  type: ComponentType.Text | ComponentType.Header | ComponentType.Link;
  content: string;
  action?: Action;
}

export interface InputNode extends BaseNode {
  type: ComponentType.Input;
}

export interface SelectNode extends BaseNode {
  type: ComponentType.Select;
}

export interface ButtonNode extends BaseNode {
  type: ComponentType.Button;
  content: string;
  action?: Action;
}

export interface ImageNode extends BaseNode {
  type: ComponentType.Image;
}

// AST 节点的联合类型
export type AstNode = PageNode | ContainerNode | FormNode | TextNode | InputNode | ButtonNode | ImageNode | SelectNode;