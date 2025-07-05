#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { parse } from './parser';
import { render } from './renderer';

interface CliOptions {
  input: string;
  output?: string;
  watch?: boolean;
  help?: boolean;
  version?: boolean;
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    input: '',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '-h':
      case '--help':
        options.help = true;
        break;
      case '-v':
      case '--version':
        options.version = true;
        break;
      case '-o':
      case '--output':
        options.output = args[++i];
        break;
      case '-w':
      case '--watch':
        options.watch = true;
        break;
      default:
        if (!options.input && !arg.startsWith('-')) {
          options.input = arg;
        }
        break;
    }
  }

  return options;
}

function showHelp() {
  console.log(`
FlowUI Compiler - 将FlowUI DSL编译成HTML

使用方法:
  flowui <input.flowui> [options]

选项:
  -o, --output <file>    输出文件路径 (默认: <input>.html)
  -w, --watch           监听文件变化并自动重新编译
  -h, --help            显示帮助信息
  -v, --version         显示版本信息

示例:
  flowui app.flowui                    # 编译为 app.html
  flowui app.flowui -o index.html      # 编译为 index.html
  flowui app.flowui --watch            # 监听模式
  
FlowUI语法示例:
  page home
      container main { layout: "vertical", spacing: "m" }
          header "欢迎"
          text "这是一个FlowUI应用"
          button "开始" -> /dashboard
  `);
}

function showVersion() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  console.log(`FlowUI Compiler v${packageJson.version}`);
}

function compileFile(inputPath: string, outputPath: string) {
  try {
    console.log(`📖 正在读取: ${inputPath}`);
    
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ 错误: 文件不存在 ${inputPath}`);
      process.exit(1);
    }

    const code = fs.readFileSync(inputPath, 'utf8');
    console.log(`⚙️  正在解析FlowUI代码...`);
    
    const ast = parse(code);
    console.log(`✅ 解析成功，找到 ${ast.length} 个页面`);
    
    console.log(`🎨 正在生成HTML...`);
    const html = render(ast);
    
    console.log(`💾 正在写入: ${outputPath}`);
    fs.writeFileSync(outputPath, html, 'utf8');
    
    console.log(`🎉 编译完成! ${inputPath} -> ${outputPath}`);
    
    // 输出一些统计信息
    const stats = {
      pages: ast.length,
      size: html.length,
      outputSize: (html.length / 1024).toFixed(2) + 'KB'
    };
    
    console.log(`📊 统计信息: ${stats.pages} 页面, ${stats.outputSize} 输出`);
    
  } catch (error) {
    console.error(`❌ 编译错误:`, error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

function watchFile(inputPath: string, outputPath: string) {
  console.log(`👀 正在监听文件变化: ${inputPath}`);
  console.log(`💡 提示: 按 Ctrl+C 退出监听模式`);
  
  // 初始编译
  compileFile(inputPath, outputPath);
  
  // 监听文件变化
  fs.watchFile(inputPath, { interval: 1000 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      console.log(`\n🔄 文件已更改，重新编译...`);
      compileFile(inputPath, outputPath);
    }
  });
}

function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  if (options.help) {
    showHelp();
    return;
  }

  if (options.version) {
    showVersion();
    return;
  }

  if (!options.input) {
    console.error('❌ 错误: 请指定输入文件');
    console.error('使用 --help 查看帮助信息');
    process.exit(1);
  }

  // 确定输出文件路径
  const inputPath = path.resolve(options.input);
  const outputPath = options.output 
    ? path.resolve(options.output)
    : inputPath.replace(/\.flowui$/, '.html').replace(/\.[^.]*$/, '.html');

  if (options.watch) {
    watchFile(inputPath, outputPath);
  } else {
    compileFile(inputPath, outputPath);
  }
}

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('❌ 未捕获的异常:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ 未处理的Promise拒绝:', reason);
  process.exit(1);
});

// 优雅地处理Ctrl+C
process.on('SIGINT', () => {
  console.log('\n👋 再见!');
  process.exit(0);
});

if (require.main === module) {
  main();
} 