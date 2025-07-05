// src/index.ts
import * as fs from 'fs';
import * as path from 'path';
import { parse } from './parser';
import { render } from './renderer';

console.log('Starting FlowUI compiler...');

// 1. 读取 DSL 源文件
const sourcePath = path.join(__dirname, '../examples/app.flowui');
const sourceCode = fs.readFileSync(sourcePath, 'utf-8');
console.log('✅ Source file read successfully.');

// 2. 解析源代码为 AST
const ast = parse(sourceCode);
console.log('✅ Source code parsed into AST.');
// console.log(JSON.stringify(ast, null, 2)); // 取消注释以查看 AST 结构

// 3. 渲染 AST 为 HTML
const htmlOutput = render(ast);
console.log('✅ AST rendered to HTML.');

// 4. 将结果写入文件
const outputPath = path.join(__dirname, '../public/index.html');
if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath));
}
fs.writeFileSync(outputPath, htmlOutput);
console.log(`🚀 Success! Output written to ${outputPath}`);
console.log('   You can now open this file in your browser.');