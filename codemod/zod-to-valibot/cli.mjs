#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const transformPath = path.join(__dirname, 'dist', 'index.mjs');
const jscodeshift = path.join(__dirname, 'node_modules', '.bin', 'jscodeshift');

const args = process.argv.slice(2);
const hasParserArg = args.some(
  (arg) => arg === '--parser' || arg.startsWith('--parser=')
);
const hasExtensionsArg = args.some((arg) => arg.startsWith('--extensions'));

const finalArgs = [...args];
if (!hasParserArg) {
  finalArgs.unshift('--parser=ts');
}
if (!hasExtensionsArg) {
  finalArgs.unshift('--extensions=ts,tsx,js,jsx');
}

if (args.length === 0) {
  console.log(`
Usage: zod-to-valibot [options] <files>

Convert Zod schemas to Valibot schemas

Examples:
  zod-to-valibot src/**/*.ts
  zod-to-valibot --dry src/schemas.ts
  zod-to-valibot --no-babel src/**/*.{ts,tsx}

Common jscodeshift options:
  --dry         Run without making changes
  --print       Print output
  --verbose=2   Increase verbosity
  --parser=ts   Specify parser (default: babel)

For all options, see: jscodeshift --help
`);
  process.exit(0);
}

try {
  const command = `"${jscodeshift}" -t "${transformPath}" ${finalArgs.join(' ')}`;
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}
