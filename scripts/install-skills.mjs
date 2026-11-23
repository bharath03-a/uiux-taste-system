#!/usr/bin/env node
/**
 * install-skills.mjs — Install portable UI/UX Taste Skills + TASTE.md into any project or global harness
 *
 * Usage:
 *   node scripts/install-skills.mjs --target /path/to/work-repo
 *   node scripts/install-skills.mjs --target /path/to/work-repo --harness claude
 *   node scripts/install-skills.mjs --global
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const skillsSrcDir = path.join(repoRoot, 'skills');
const tasteMdSrc = path.join(repoRoot, 'taste', 'TASTE.md');

const args = process.argv.slice(2);
const isGlobal = args.includes('--global');
const targetIdx = args.indexOf('--target');
const harnessIdx = args.indexOf('--harness');

const targetRoot = isGlobal
  ? os.homedir()
  : targetIdx !== -1 && args[targetIdx + 1]
    ? path.resolve(args[targetIdx + 1])
    : repoRoot;

const harness = harnessIdx !== -1 && args[harnessIdx + 1] ? args[harnessIdx + 1] : 'all';

const HARNESS_DIRS = {
  agents: path.join(targetRoot, '.agents', 'skills'),
  claude: path.join(targetRoot, '.claude', 'skills'),
  gemini: path.join(targetRoot, '.gemini', 'skills'),
  cursor: path.join(targetRoot, '.cursor', 'skills'),
};

const selectedTargets =
  harness === 'all'
    ? Object.entries(HARNESS_DIRS)
    : HARNESS_DIRS[harness]
      ? [[harness, HARNESS_DIRS[harness]]]
      : null;

if (!selectedTargets) {
  console.error(`Unknown --harness "${harness}". Use one of: all, agents, claude, gemini, cursor`);
  process.exit(1);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Sync latest compiled taste/TASTE.md into ui-taste-craft/references/TASTE.md so skills are self-contained
if (fs.existsSync(tasteMdSrc)) {
  const bundledRefDir = path.join(skillsSrcDir, 'ui-taste-craft', 'references');
  fs.mkdirSync(bundledRefDir, { recursive: true });
  fs.copyFileSync(tasteMdSrc, path.join(bundledRefDir, 'TASTE.md'));
}

const skillNames = fs
  .readdirSync(skillsSrcDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(skillsSrcDir, d.name, 'SKILL.md')))
  .map((d) => d.name);

console.log(`\nInstalling ${skillNames.length} UI/UX Taste Skills (${skillNames.join(', ')})`);
console.log(`Target root: ${targetRoot}\n`);

for (const [name, destBase] of selectedTargets) {
  for (const skill of skillNames) {
    const src = path.join(skillsSrcDir, skill);
    const dest = path.join(destBase, skill);
    copyDir(src, dest);
  }
  console.log(`  ✓ [${name}] -> ${destBase}`);
}

// Copy TASTE.md into target repo root if installing into another repo (never overwrite without flag)
if (!isGlobal && targetRoot !== repoRoot && fs.existsSync(tasteMdSrc)) {
  const tasteDest = path.join(targetRoot, 'TASTE.md');
  if (!fs.existsSync(tasteDest) || args.includes('--force')) {
    fs.copyFileSync(tasteMdSrc, tasteDest);
    console.log(`  ✓ Copied TASTE.md -> ${tasteDest}`);
  } else {
    console.log(`  • Kept existing ${tasteDest} (pass --force to overwrite)`);
  }
}

console.log('\nDone! Your AI coding assistant can now read TASTE.md and use your UI/UX skills.\n');
