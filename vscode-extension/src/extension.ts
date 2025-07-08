import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('FlowUI Syntax Highlighter is now active!');
    
    // Register language features
    const selector = { language: 'flowui', scheme: 'file' };
    
    // Add basic language features
    context.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider(selector, new FlowUIDocumentSymbolProvider())
    );
    
    // Display activation message
    vscode.window.showInformationMessage('FlowUI Syntax Highlighter activated!');
}

export function deactivate() {
    console.log('FlowUI Syntax Highlighter is deactivated.');
}

class FlowUIDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    provideDocumentSymbols(document: vscode.TextDocument): vscode.DocumentSymbol[] {
        const symbols: vscode.DocumentSymbol[] = [];
        
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            const text = line.text;
            
            // Match page declarations
            const pageMatch = text.match(/^\\s*(page)\\s+([a-zA-Z][a-zA-Z0-9_]*)/);
            if (pageMatch) {
                const pageName = pageMatch[2];
                const symbol = new vscode.DocumentSymbol(
                    pageName,
                    'Page',
                    vscode.SymbolKind.Class,
                    line.range,
                    line.range
                );
                symbols.push(symbol);
            }
            
            // Match component declarations
            const componentMatch = text.match(/^\\s*(container|form|header|text|input|button|select|image|link)\\s+([a-zA-Z][a-zA-Z0-9_]*)?/);
            if (componentMatch) {
                const componentType = componentMatch[1];
                const componentId = componentMatch[2] || componentType;
                const symbol = new vscode.DocumentSymbol(
                    componentId,
                    componentType,
                    vscode.SymbolKind.Property,
                    line.range,
                    line.range
                );
                symbols.push(symbol);
            }
        }
        
        return symbols;
    }
} 