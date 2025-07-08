#!/bin/bash

# FlowUI VSCode Extension Installation Script

set -e

echo "🚀 Installing FlowUI VSCode Extension..."
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Compile the extension
echo "🔨 Compiling extension..."
npm run compile

# Check if vsce is installed globally
if ! command -v vsce &> /dev/null; then
    echo "📦 Installing vsce (Visual Studio Code Extension Manager)..."
    npm install -g vsce
fi

# Package the extension
echo "📦 Packaging extension..."
vsce package

# Find the generated .vsix file
VSIX_FILE=$(find . -name "*.vsix" | head -1)

if [ -z "$VSIX_FILE" ]; then
    echo "❌ Could not find generated .vsix file"
    exit 1
fi

echo "✅ Extension packaged successfully: $VSIX_FILE"
echo ""
echo "🎉 Installation complete!"
echo "========================================"
echo ""
echo "To install the extension in VS Code:"
echo "1. Open VS Code"
echo "2. Go to Extensions view (Ctrl+Shift+X)"
echo "3. Click the '...' menu"
echo "4. Select 'Install from VSIX...'"
echo "5. Choose the file: $VSIX_FILE"
echo ""
echo "Or use the command line:"
echo "code --install-extension $VSIX_FILE"
echo ""
echo "To test the extension:"
echo "1. Open any .flowui file in VS Code"
echo "2. The syntax highlighting should activate automatically"
echo "3. Try the custom theme: Ctrl+Shift+P -> 'Preferences: Color Theme' -> 'FlowUI Dark'"
echo ""
echo "Happy coding with FlowUI! 🎨" 