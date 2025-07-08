# FlowUI Syntax Highlighter

A Visual Studio Code extension that provides syntax highlighting for FlowUI DSL (Domain Specific Language) files.

## Features

- **Syntax Highlighting**: Rich color-coded syntax highlighting for FlowUI components
- **Custom Theme**: Includes a custom dark theme optimized for FlowUI
- **Document Symbols**: Navigate through pages and components using the outline view
- **Auto-completion**: Bracket matching and auto-closing pairs
- **Code Folding**: Collapse and expand code sections

## Supported Elements

The extension provides highlighting for:

- **Page declarations** (`page`)
- **Component types** (`container`, `form`, `header`, `text`, `input`, `button`, `select`, `image`, `link`)
- **Component identifiers** (variable names)
- **Strings** (content in double quotes)
- **Properties** (layout, spacing, align, etc.)
- **Actions** (`->` operator, page navigation, `submit`, `alert`)
- **Comments** (`//` line comments)

## Color Scheme

- **🟣 Page declarations**: Purple (bold)
- **🟡 Page names**: Yellow (bold)
- **🔵 Component keywords**: Blue (bold)
- **🟢 Component identifiers**: Light blue
- **🟠 Strings**: Orange
- **🔹 Property names**: Light blue
- **🟢 Property values**: Light green
- **➡️ Action operators**: White (bold)
- **🔷 Page references**: Teal
- **🟪 Action keywords**: Purple
- **🔷 Layout keywords**: Light blue
- **🟨 Spacing keywords**: Gold
- **🔴 Input type keywords**: Red

## Installation

### From Source

1. Clone this repository
2. Navigate to the extension directory:
   ```bash
   cd flowui/vscode-extension
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Install the extension in VS Code:
   - Press `F5` to open a new Extension Development Host window
   - Or use the command palette: `Developer: Install Extension from Location`

### Manual Installation

1. Package the extension:
   ```bash
   npm install -g vsce
   vsce package
   ```
2. Install the generated `.vsix` file:
   - Open VS Code
   - Go to Extensions view (`Ctrl+Shift+X`)
   - Click the "..." menu
   - Select "Install from VSIX..."
   - Choose the generated `.vsix` file

## Usage

1. Open a `.flowui` file in VS Code
2. The syntax highlighting will automatically activate
3. To use the custom theme:
   - Open Command Palette (`Ctrl+Shift+P`)
   - Type "Preferences: Color Theme"
   - Select "FlowUI Dark"

## Example

Here's how FlowUI code will look with syntax highlighting:

```flowui
page welcome
    container main { layout: "vertical", align: "center", spacing: "l" }
        header "Welcome to FlowUI"
        text "This is a sample FlowUI application"
        
        form loginForm { layout: "vertical", spacing: "m" }
            input username { placeholder: "Username" }
            input password { type: "password", placeholder: "Password" }
            button "Login" -> /dashboard
        
        link "Sign up" -> /register
```

## Development

### Project Structure

```
flowui/vscode-extension/
├── package.json              # Extension manifest
├── src/
│   └── extension.ts          # Main extension code
├── syntaxes/
│   └── flowui.tmLanguage.json # TextMate grammar
├── themes/
│   └── flowui-dark.json      # Custom dark theme
├── language-configuration.json # Language configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

### Building

```bash
npm run compile
```

### Testing

```bash
npm run watch
```

Then press `F5` to open the Extension Development Host.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension
5. Submit a pull request

## License

This extension is part of the FlowUI project. See the main project license for details.

## Support

If you encounter any issues or have suggestions for improvements, please file an issue in the main FlowUI repository. 