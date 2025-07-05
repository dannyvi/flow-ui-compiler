# FlowUI Compiler

FlowUI是一个专注于UI结构和用户流程的领域特定语言（DSL）。它让产品设计回归本质，用极简的语法表达复杂的交互逻辑。

## 🚀 特性

- **极简语法**: 用最少的代码表达最多的意图
- **结构优先**: 缩进表示层级，直观易懂
- **交互流程**: 用 `->` 表示用户流程，清晰明了
- **快速原型**: 几分钟内构建完整的应用原型
- **CLI工具**: 一键编译为可直接运行的HTML

## 📦 安装

```bash
npm install -g flow-ui-compiler
```

或者本地开发：

```bash
git clone <repository>
cd flow-ui-compiler
npm install
npm run build
```

## 🎯 快速开始

### 1. 创建FlowUI文件

创建一个 `app.flowui` 文件：

```flowui
page home
    container main { layout: "vertical", align: "center", spacing: "l" }
        header "欢迎使用FlowUI"
        text "这是一个简单的应用演示"
        
        container buttons { layout: "horizontal", spacing: "m" }
            button "开始体验" -> /demo
            button "了解更多" -> /about

page demo
    container main { layout: "vertical", spacing: "m" }
        header "功能演示"
        form demoForm { layout: "vertical", spacing: "m" }
            input nameInput { placeholder: "请输入您的姓名" }
            button "提交" -> alert("提交成功！")
```

### 2. 编译为HTML

```bash
# 编译单个文件
flowui app.flowui

# 指定输出文件
flowui app.flowui -o index.html

# 监听模式（开发时使用）
flowui app.flowui --watch
```

### 3. 在浏览器中查看

编译后会生成一个完整的HTML文件，可以直接在浏览器中打开。

## 🎨 FlowUI语法

### 基本结构

```
ComponentType [Identifier] ["Content"] [-> Action] { properties }
```

### 组件类型

**页面与结构**
- `page <name>` - 定义页面
- `container [id]` - 通用容器
- `form [id]` - 表单容器

**内容组件**
- `header "text"` - 标题
- `text "text"` - 文本
- `image [id] { src: "url" }` - 图片
- `link "text" -> action` - 链接

**交互组件**
- `input [id] { placeholder: "text", type: "text|password|email" }` - 输入框
- `button "text" -> action` - 按钮
- `select [id] { options: ["A", "B", "C"] }` - 下拉选择

### 交互动作

- `-> /pageName` - 导航到页面
- `-> submit` - 提交表单
- `-> alert("message")` - 显示警告框

### 布局系统

- `{ layout: "vertical" | "horizontal" }` - 排列方向
- `{ spacing: "s" | "m" | "l" }` - 间距大小
- `{ align: "center" | "start" | "end" }` - 对齐方式

## 🛠️ CLI工具

### 命令行选项

```bash
flowui <input.flowui> [options]

选项:
  -o, --output <file>    输出文件路径
  -w, --watch           监听文件变化
  -h, --help            显示帮助信息
  -v, --version         显示版本信息
```

### 示例

```bash
# 基本编译
flowui login.flowui

# 自定义输出
flowui login.flowui -o dist/login.html

# 监听模式
flowui login.flowui --watch

# 查看帮助
flowui --help
```

## 📁 项目结构

```
flow-ui-compiler/
├── src/
│   ├── types.ts        # 类型定义
│   ├── parser.ts       # 解析器
│   ├── renderer.ts     # 渲染器
│   ├── cli.ts          # CLI工具
│   └── index.ts        # 入口文件
├── examples/           # 示例文件
│   ├── login.flowui
│   └── simple-app.flowui
├── FLOWUI_SPEC.md      # 完整语法规范
└── README.md
```

## 🎯 示例

查看 `examples/` 目录中的示例文件：

- `login.flowui` - 完整的登录注册流程
- `simple-app.flowui` - 展示各种组件的简单应用

## 🔧 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 编译
npm run build

# 测试CLI
npm run cli examples/login.flowui
```

## 📚 设计哲学

FlowUI遵循以下设计原则：

1. **极简主义** - 每个关键词都有明确目的
2. **可读性** - 非技术人员也能理解
3. **LLM友好** - 大语言模型可以轻松理解和生成
4. **渐进式** - 可以从简单开始，逐步添加复杂性
5. **分离关注点** - 专注于结构和流程，不关心样式细节

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

---

*FlowUI - 让UI设计回归本质* 🎨 