// src/renderer.ts
import { AstNode, ButtonNode, ComponentType, FormNode, ImageNode, InputNode, PageNode, SelectNode, TextNode } from './types';

function getFormAction(node: AstNode): string {
  // Check if form has any submit buttons with specific actions
  const submitButtons = findSubmitButtons(node);
  if (submitButtons.length > 0) {
    return 'onsubmit="return false"'; // Prevent default form submission
  }
  return '';
}

function findSubmitButtons(node: AstNode): AstNode[] {
  const results: AstNode[] = [];
  
  function traverse(n: AstNode) {
    if (n.type === ComponentType.Button) {
      const action = (n as any).action;
      if (action && action.type === 'submit') {
        results.push(n);
      }
    }
    n.children.forEach(traverse);
  }
  
  traverse(node);
  return results;
}

function generateSelectOptions(options: string[]): string {
  if (!Array.isArray(options)) return '';
  return options.map(option => `<option value="${option}">${option}</option>`).join('');
}

function renderNode(node: AstNode): string {
  let classes = `flow-ui-${node.type}`;
  if (node.identifier) classes += ` ${node.identifier}`;
  if (node.properties.layout) classes += ` layout-${node.properties.layout}`;
  if (node.properties.align) classes += ` align-${node.properties.align}`;
  if (node.properties.spacing) classes += ` spacing-${node.properties.spacing}`;

  const childrenHtml = node.children.map(renderNode).join('\n');
  let actionHtml = '';
  const action = (node as any).action;
  if (action) {
    switch (action.type) {
      case 'navigate':
        actionHtml = `onclick="window.location.hash='${action.target.substring(1).toLowerCase()}'"`;
        break;
      case 'alert':
        actionHtml = `onclick="alert('${action.target.replace(/'/g, "\\'")}')"`;
        break;
      case 'submit':
        actionHtml = `onclick="this.closest('form')?.submit()"`;
        break;
    }
  }

  switch (node.type) {
    case ComponentType.Container:
      return `<div class="${classes}">${childrenHtml}</div>`;
    case ComponentType.Form:
      return `<form class="${classes}" ${getFormAction(node)}>${childrenHtml}</form>`;
    case ComponentType.Header:
      return `<h1 class="${classes}">${(node as TextNode).content}</h1>`;
    case ComponentType.Text:
      return `<p class="${classes}">${(node as TextNode).content}</p>`;
    case ComponentType.Link:
      const action = (node as any).action;
      let href = '#';
      if (action?.type === 'navigate') {
        href = `#${action.target.substring(1).toLowerCase()}`;
      }
      return `<a href="${href}" class="${classes}">${(node as TextNode).content}</a>`;
    case ComponentType.Image:
      return `<img class="${classes}" src="${node.properties.src}" alt="${node.identifier || 'image'}">`;
    case ComponentType.Input:
      return `<input class="${classes}" type="${node.properties.type || 'text'}" placeholder="${node.properties.placeholder || ''}">`;
    case ComponentType.Button:
      return `<button class="${classes}" ${actionHtml}>${(node as ButtonNode).content}</button>`;
    case ComponentType.Select:
      return `<select class="${classes}">${generateSelectOptions(node.properties.options || [])}</select>`;
    default:
      return `<!-- Unsupported component: ${node.type} -->`;
  }
}

function generateCss(): string {
  return `
    /* FlowUI Base Styles */
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
      margin: 0; 
      background-color: #f0f2f5; 
      line-height: 1.6;
    }
    
    /* Page Container */
    .page-container { 
      display: none; 
      padding: 20px; 
      max-width: 800px; 
      margin: 20px auto; 
      background-color: #fff; 
      border-radius: 8px; 
      box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
    }
    .page-container.active { display: block; }
    
    /* Layout System */
    .layout-vertical { 
      display: flex; 
      flex-direction: column; 
    }
    .layout-horizontal { 
      display: flex; 
      flex-direction: row; 
      align-items: center; 
    }
    
    /* Alignment */
    .align-center { 
      align-items: center; 
      justify-content: center; 
    }
    .align-start { 
      align-items: flex-start; 
      justify-content: flex-start; 
    }
    .align-end { 
      align-items: flex-end; 
      justify-content: flex-end; 
    }
    
    /* Spacing System */
    .spacing-s > * + * { margin-top: 8px; }
    .spacing-m > * + * { margin-top: 16px; }
    .spacing-l > * + * { margin-top: 24px; }
    
    .layout-horizontal.spacing-s > * + * { margin-top: 0; margin-left: 8px; }
    .layout-horizontal.spacing-m > * + * { margin-top: 0; margin-left: 16px; }
    .layout-horizontal.spacing-l > * + * { margin-top: 0; margin-left: 24px; }
    
    /* Component Styles */
    .flow-ui-container {
      display: flex;
      flex-direction: column;
    }
    
    .flow-ui-form {
      display: flex;
      flex-direction: column;
    }
    
    .flow-ui-header {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
    }
    
    .flow-ui-text {
      margin: 0;
      color: #666;
    }
    
    .flow-ui-input {
      padding: 12px 16px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 6px;
      width: 100%;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    
    .flow-ui-input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
    }
    
    .flow-ui-button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 500;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .flow-ui-button:hover {
      background-color: #0056b3;
    }
    
    .flow-ui-link {
      color: #007bff;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s;
    }
    
    .flow-ui-link:hover {
      color: #0056b3;
      text-decoration: underline;
    }
    
    .flow-ui-image {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
    
    .flow-ui-select {
      padding: 12px 16px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 6px;
      width: 100%;
      box-sizing: border-box;
      background-color: white;
      cursor: pointer;
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      .page-container {
        margin: 10px;
        padding: 15px;
      }
      
      .layout-horizontal {
        flex-direction: column;
      }
      
      .layout-horizontal.spacing-s > * + *,
      .layout-horizontal.spacing-m > * + *,
      .layout-horizontal.spacing-l > * + * {
        margin-left: 0;
        margin-top: 12px;
      }
    }
  `;
}

export function render(pages: PageNode[]): string {
  const css = generateCss();
  const pagesHtml = pages.map((page, index) =>
    `<div id="${page.name.toLowerCase()}" class="page-container ${index === 0 ? 'active' : ''}">
      ${page.children.map(renderNode).join('\n')}
    </div>`
  ).join('\n');

  // Simple client-side routing logic
  const script = `
    <script>
      function handleHashChange() {
        const hash = window.location.hash.substring(1) || '${pages[0].name.toLowerCase()}';
        document.querySelectorAll('.page-container').forEach(p => p.classList.remove('active'));
        const activePage = document.getElementById(hash);
        if (activePage) activePage.classList.add('active');
      }
      window.addEventListener('hashchange', handleHashChange);
      window.addEventListener('load', handleHashChange); // Handle initial load
    </script>
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FlowUI App</title>
      <style>${css}</style>
    </head>
    <body>
      ${pagesHtml}
      ${script}
    </body>
    </html>
  `;
}