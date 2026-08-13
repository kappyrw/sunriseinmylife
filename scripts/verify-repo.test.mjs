import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const git = (args) => execFileSync('git', args, { encoding: 'utf8', cwd: process.cwd() });

// Patterns that must never be part of the tracked history. These are build
// artifacts / dependencies / editor state, not source code.
const FORBIDDEN_TRACKED = [/^node_modules\//, /^\.next\//, /^\.nova\//];

// Source files that the "clean" snapshot must contain. These are the files the
// push was meant to preserve, so losing any of them is a regression.
const REQUIRED_TRACKED = [
  '.gitignore',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'app/page.tsx',
  'components/header.tsx',
  'lib/translations.ts',
  'public/images/mom.jpg',
];

const isIgnored = (path) => {
  try {
    git(['check-ignore', '-q', '--', path]);
    return true;
  } catch {
    return false;
  }
};

test('.gitignore is valid UTF-8 with no BOM and contains the required rules', () => {
  const bytes = readFileSync('.gitignore');

  // Reject UTF-16 LE/BE BOMs (the old file was UTF-16 LE).
  assert.ok(
    !(bytes[0] === 0xff && bytes[1] === 0xfe),
    '.gitignore still has a UTF-16 LE BOM',
  );
  assert.ok(
    !(bytes[0] === 0xfe && bytes[1] === 0xff),
    '.gitignore still has a UTF-16 BE BOM',
  );
  // Reject a UTF-8 BOM.
  assert.ok(
    !(bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf),
    '.gitignore still has a UTF-8 BOM',
  );

  // Decoding must succeed with no replacement characters.
  let text;
  assert.doesNotThrow(() => {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  }, '.gitignore is not valid UTF-8');
  assert.ok(!text.includes('\uFFFD'), '.gitignore contains invalid UTF-8 bytes');

  const lines = text.split(/\r?\n/).map((line) => line.trim());
  for (const rule of ['node_modules', '.next', '.nova']) {
    assert.ok(
      lines.some((line) => line === rule || line === `${rule}/` || line === `/${rule}`),
      `.gitignore is missing an ignore rule for "${rule}"`,
    );
  }
});

test('git treats node_modules, .next and .nova as ignored', () => {
  for (const path of ['node_modules', '.next', '.nova']) {
    assert.ok(isIgnored(path), `git check-ignore does not ignore "${path}"`);
  }
});

test('no build artifact, dependency or editor files are tracked', () => {
  const tracked = git(['ls-files']).split(/\r?\n/).filter(Boolean);
  assert.ok(tracked.length > 0, 'no files are tracked at all');

  const bad = tracked.filter((path) => FORBIDDEN_TRACKED.some((re) => re.test(path)));
  assert.deepEqual(bad, [], `forbidden files are tracked: ${bad.join(', ')}`);
});

test('the required source files are tracked', () => {
  const tracked = new Set(git(['ls-files']).split(/\r?\n/).filter(Boolean));
  for (const path of REQUIRED_TRACKED) {
    assert.ok(tracked.has(path), `required source file is missing: ${path}`);
  }
});

test('there are no uncommitted changes to tracked files', () => {
  const changed = git(['status', '--porcelain', '--untracked-files=no']).trim();
  assert.equal(changed, '', `working tree has uncommitted tracked changes:\n${changed}`);
});

test('local main is pushed to origin/main', () => {
  const local = git(['rev-parse', 'HEAD']).trim();
  const remote = git(['ls-remote', 'origin', 'refs/heads/main']).trim();
  assert.notEqual(remote, '', 'origin/main is not reachable');
  const remoteHash = remote.split(/\s+/)[0];
  assert.equal(remoteHash, local, 'origin/main does not match local HEAD');
});

test('the pre-rewrite main history is preserved in a backup branch', () => {
  const remote = git(['ls-remote', 'origin', 'refs/heads/backup-old-main']).trim();
  assert.match(remote, /refs\/heads\/backup-old-main$/, 'backup-old-main is missing on origin');
});
