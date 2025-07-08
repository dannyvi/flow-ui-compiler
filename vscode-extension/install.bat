@echo off
setlocal enabledelayedexpansion

echo 🚀 Installing FlowUI VSCode Extension...
echo ========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Compile the extension
echo 🔨 Compiling extension...
npm run compile
if %errorlevel% neq 0 (
    echo ❌ Failed to compile extension
    pause
    exit /b 1
)

REM Check if vsce is installed globally
vsce --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing vsce (Visual Studio Code Extension Manager)...
    npm install -g vsce
    if %errorlevel% neq 0 (
        echo ❌ Failed to install vsce
        pause
        exit /b 1
    )
)

REM Package the extension
echo 📦 Packaging extension...
vsce package
if %errorlevel% neq 0 (
    echo ❌ Failed to package extension
    pause
    exit /b 1
)

REM Find the generated .vsix file
for %%f in (*.vsix) do set VSIX_FILE=%%f

if not defined VSIX_FILE (
    echo ❌ Could not find generated .vsix file
    pause
    exit /b 1
)

echo ✅ Extension packaged successfully: %VSIX_FILE%
echo.
echo 🎉 Installation complete!
echo ========================================
echo.
echo To install the extension in VS Code:
echo 1. Open VS Code
echo 2. Go to Extensions view (Ctrl+Shift+X)
echo 3. Click the '...' menu
echo 4. Select 'Install from VSIX...'
echo 5. Choose the file: %VSIX_FILE%
echo.
echo Or use the command line:
echo code --install-extension %VSIX_FILE%
echo.
echo To test the extension:
echo 1. Open any .flowui file in VS Code
echo 2. The syntax highlighting should activate automatically
echo 3. Try the custom theme: Ctrl+Shift+P -^> 'Preferences: Color Theme' -^> 'FlowUI Dark'
echo.
echo Happy coding with FlowUI! 🎨
pause 