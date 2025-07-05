# FlowUI DSL 设计规范

## 设计哲学

FlowUI 是一个专注于UI结构和用户流程的领域特定语言（DSL）。它极度关注：

- **结构优先 (Structure First)**: 使用缩进来表示层级，极度简洁
- **意图驱动 (Intent-Driven)**: 关键词描述组件的"角色"，而不是HTML标签
- **流程核心 (Flow is King)**: 交互是语言的一等公民，用最直观的方式 `->` 表示
- **关注本质，忽略细节**: 默认完全不关心颜色、字体、精确间距等视觉样式

## 核心语法

```
ComponentType [Identifier] ["Content"] [-> Action] { properties }
```

### 语法元素

- **ComponentType** (必需): 定义元素的角色。例如 `page`, `container`, `header`, `input`, `button`
- **[Identifier]** (可选): 组件的唯一名称，用于更复杂的交互或测试
- **["Content"]** (可选): 组件包含的可见文本。用双引号包裹
- **[-> Action]** (可选): 定义一个简单的点击/提交动作
- **{ properties }** (可选): 一组用 `{}` 包裹的、对组件功能至关重要的键值对

## 核心元素词汇表

### 页面与结构 (Page & Structure)

- **`page <PageName>`**: 定义一个新页面的开始，是所有内容的根
- **`container [id]`**: 通用容器，用于组织和布局其他组件
- **`form [id]`**: 表单容器，语义上用于包裹输入和提交按钮

### 内容组件 (Content Components)

- **`header ["text"]`**: 表示一个标题。渲染时可默认为 `<h1>` 或 `<h2>`
- **`text ["text"]`**: 表示一段普通文本
- **`image [id] { src: "url" }`**: 图像。src 是其最重要的属性
- **`link ["text"] -> Action`**: 一个链接

### 交互组件 (Interactive Components)

- **`input [id] { placeholder: "text", type: "text|password|email" }`**: 输入框
- **`button ["text"] -> Action`**: 按钮。其核心是一个文本和一个动作
- **`select [id] { options: ["A", "B", "C"] }`**: 下拉选择框

## 交互模型

FlowUI 支持以下交互动作：

- **`-> /PageName`**: 导航到另一个页面
- **`-> submit`**: 在 form 内部时，表示提交表单
- **`-> alert("message")`**: 弹出一个简单的提示框

## 布局系统

为了避免陷入 CSS 的泥潭，我们只定义最高级的布局概念：

- **`{ layout: "vertical" | "horizontal" }`**: 定义子元素的排列方向。默认为 vertical
- **`{ spacing: "s" | "m" | "l" }`**: 定义子元素之间的间距。这是一个抽象值，具体像素由渲染器决定
- **`{ align: "center" | "start" | "end" }`**: 定义子元素在交叉轴上的对齐方式

## 示例

### 完整的登录页面示例

```flowui
page Login
    container main { layout: "vertical", align: "center", spacing: "l" }
        image logo { src: "logo.png" }
        header "欢迎登录"

        form loginForm { layout: "vertical", spacing: "m" }
            input username { placeholder: "用户名" }
            input password { type: "password", placeholder: "密码" }
            button "登录" -> /dashboard

        link "没有账号？点击注册" -> /register

page dashboard
    container main { layout: "vertical", spacing: "m" }
        header "仪表盘"
        text "欢迎来到您的个人仪表盘！"
        button "退出登录" -> /login
```

### 多页面应用示例

```flowui
page home
    container main { layout: "vertical", align: "center", spacing: "l" }
        header "欢迎使用我们的应用"
        text "这是一个使用FlowUI构建的简单应用"
        container buttons { layout: "horizontal", spacing: "m" }
            button "开始使用" -> /dashboard
            button "了解更多" -> /about

page about
    container main { layout: "vertical", spacing: "m" }
        header "关于我们"
        text "我们致力于创建简单易用的应用"
        button "返回首页" -> /home
```

## 编译流程

FlowUI 的编译过程分为两个主要步骤：

1. **解析 (Parsing)**: 将 FlowUI 文本转换为抽象语法树 (AST)
2. **渲染 (Rendering)**: 将 AST 转换为 HTML 和 CSS

### AST 结构示例

```json
{
  "type": "Page",
  "name": "Login", 
  "children": [
    {
      "type": "Container",
      "identifier": "main",
      "properties": { "layout": "vertical", "align": "center", "spacing": "l" },
      "children": [
        { "type": "Image", "identifier": "logo", "properties": { "src": "logo.png" } },
        { "type": "Header", "content": "欢迎登录" },
        {
          "type": "Form",
          "identifier": "loginForm", 
          "properties": { "layout": "vertical", "spacing": "m" },
          "children": [
            { "type": "Input", "identifier": "username", "properties": { "placeholder": "用户名" } },
            { "type": "Input", "identifier": "password", "properties": { "type": "password", "placeholder": "密码" } },
            { "type": "Button", "content": "登录", "action": { "type": "navigate", "target": "/dashboard" } }
          ]
        },
        { "type": "Link", "content": "没有账号？点击注册", "action": { "type": "navigate", "target": "/register" } }
      ]
    }
  ]
}
```

## 设计原则

1. **极简主义**: 每个关键词都有明确的目的，没有冗余
2. **可读性**: 非技术人员也能理解FlowUI代码的结构和意图
3. **LLM友好**: 大语言模型可以轻松理解和生成FlowUI代码
4. **渐进式**: 可以从简单开始，逐步添加复杂性
5. **分离关注点**: 结构与样式分离，专注于功能和流程

## 扩展性

FlowUI 设计为易于扩展：

- **新组件类型**: 可以轻松添加新的 ComponentType
- **新交互动作**: 可以扩展 Action 系统
- **新布局属性**: 可以添加更多布局和样式属性
- **自定义渲染器**: 可以为不同的目标平台创建专门的渲染器

## 最佳实践

1. **保持简洁**: 优先使用最简单的组件和属性
2. **语义化命名**: 使用描述功能而不是样式的标识符
3. **层次清晰**: 合理使用缩进来表示组件层级
4. **交互明确**: 确保每个交互都有明确的目标和意图
5. **渐进增强**: 从基本功能开始，逐步添加复杂性

---

*FlowUI - 让UI设计回归本质* 