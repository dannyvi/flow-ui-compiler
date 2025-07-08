# FlowUI VSCode Extension - Quick Start

## 📁 Project Structure

```
flowui/vscode-extension/
├── 📄 package.json              # Extension manifest and dependencies
├── 📄 README.md                 # Full documentation
├── 📄 QUICK_START.md           # This file
├── 📄 .gitignore               # Git ignore rules
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 language-configuration.json # Language features config
├── 📄 test-example.flowui       # Test file for syntax highlighting
├── 🛠️ install.sh               # Installation script (Linux/Mac)
├── 🛠️ install.bat              # Installation script (Windows)
│
├── 📁 src/
│   └── 📄 extension.ts          # Main extension logic
│
├── 📁 syntaxes/
│   └── 📄 flowui.tmLanguage.json # TextMate grammar for syntax highlighting
│
├── 📁 themes/
│   └── 📄 flowui-dark.json      # Custom dark theme
│
└── 📁 .vscode/
    ├── 📄 launch.json           # Debug configuration
    └── 📄 tasks.json            # Build tasks
```

## 🚀 Quick Install

### Option 1: Automatic Installation (Recommended)

**Linux/Mac:**
```bash
chmod +x install.sh
./install.sh
```

**Windows:**
```cmd
install.bat
```

### Option 2: Manual Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Compile the extension:**
   ```bash
   npm run compile
   ```

3. **Package the extension:**
   ```bash
   npm install -g vsce
   vsce package
   ```

4. **Install in VS Code:**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Click "..." → "Install from VSIX..."
   - Select the generated `.vsix` file

## 🎨 What You Get

### Syntax Highlighting Colors

| Element | Color | Example |
|---------|-------|---------|
| 🟣 Page declarations | Purple (bold) | `page welcome` |
| 🟡 Page names | Yellow (bold) | `welcome` |
| 🔵 Component keywords | Blue (bold) | `container`, `button`, `input` |
| 🟢 Component IDs | Light blue | `main`, `loginForm` |
| 🟠 Strings | Orange | `"Welcome to FlowUI"` |
| 🔹 Property names | Light blue | `layout`, `spacing` |
| 🟢 Property values | Light green | `"vertical"`, `"center"` |
| ➡️ Action operators | White (bold) | `->` |
| 🔷 Page references | Teal | `/dashboard` |
| 🟪 Action keywords | Purple | `submit`, `alert` |

### Language Features

- ✅ **Syntax Highlighting** - Rich color coding
- ✅ **Auto-completion** - Bracket matching
- ✅ **Code Folding** - Collapse sections
- ✅ **Document Outline** - Navigate via outline
- ✅ **Custom Theme** - "FlowUI Dark" theme
- ✅ **File Association** - Auto-detect `.flowui` files

## 🧪 Testing

1. **Open the test file:**
   ```bash
   code test-example.flowui
   ```

2. **Verify syntax highlighting:**
   - Keywords should be colored
   - Strings should be orange
   - Page names should be yellow

3. **Try the custom theme:**
   - Press `Ctrl+Shift+P`
   - Type "Preferences: Color Theme"
   - Select "FlowUI Dark"

## 🔧 Development

### Debug the Extension

1. **Open in VS Code:**
   ```bash
   code .
   ```

2. **Press F5** to launch Extension Development Host

3. **Open a `.flowui` file** in the new window

### Watch Mode

For continuous development:
```bash
npm run watch
```

### Build

```bash
npm run compile
```

## 📝 FlowUI Syntax Example

```flowui
// This is a comment
page welcome
    container main { layout: "vertical", align: "center", spacing: "l" }
        header "Welcome to FlowUI"
        text "Start building beautiful UIs with FlowUI DSL"
        
        form loginForm { layout: "vertical", spacing: "m" }
            input username { placeholder: "Username", type: "text" }
            input password { placeholder: "Password", type: "password" }
            button "Login" -> /dashboard
        
        link "Sign up" -> /register
```

## 🐛 Troubleshooting

### Extension Not Working?

1. **Check file extension:** Make sure file ends with `.flowui`
2. **Reload VS Code:** Press `Ctrl+Shift+P` → "Developer: Reload Window"
3. **Check installation:** Go to Extensions → Search "FlowUI"

### No Syntax Highlighting?

1. **Force language mode:** Press `Ctrl+Shift+P` → "Change Language Mode" → "FlowUI"
2. **Check theme:** Some themes may override colors
3. **Try FlowUI Dark theme:** Built specifically for FlowUI

### Build Errors?

1. **Check Node.js version:** Requires Node.js 16+
2. **Clear cache:** `npm cache clean --force`
3. **Reinstall dependencies:** `rm -rf node_modules && npm install`

## 🎯 Next Steps

1. **Create your first FlowUI file:**
   ```bash
   touch my-app.flowui
   code my-app.flowui
   ```

2. **Start with a simple page:**
   ```flowui
   page home
       container main { layout: "vertical", spacing: "m" }
           header "My First FlowUI App"
           text "Hello, World!"
   ```

3. **Explore the examples** in `test-example.flowui`

4. **Read the full documentation** in `README.md`

## 📚 Learn More

- [FlowUI Specification](../FLOWUI_SPEC.md)
- [TextMate Grammar Guide](https://macromates.com/manual/en/language_grammars)
- [VS Code Extension API](https://code.visualstudio.com/api)

---

**Happy coding with FlowUI! 🎨✨** 