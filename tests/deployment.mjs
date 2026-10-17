// No dependencies: exercise the actual Vercel build in an isolated directory.
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { runInNewContext } from 'node:vm';

const root = fileURLToPath(new URL('..', import.meta.url));
const config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
assert.deepEqual(config.git.deploymentEnabled, { '*': false, main: true });
assert.equal(config.installCommand, '');
assert.equal(config.outputDirectory, 'public');
const ignore = readFileSync(join(root, '.vercelignore'), 'utf8').split(/\r?\n/);
for (const pattern of ['.github/', 'assets_src/', 'tests/', 'test/', 'scripts/', 'tools/', 'docs/', '*.md', '*.psd', '*.ai', '*.zip', '*.pdf']) {
  assert(ignore.includes(pattern), `Missing deployment exclusion: ${pattern}`);
}
function files(dir, prefix = '') {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = prefix + entry.name;
    return entry.isDirectory() ? files(join(dir, entry.name), path + '/') : [path];
  });
}
const work = mkdtempSync(join(tmpdir(), 'scout-deploy-'));
try {
  // Include development sources too: Git deployments must be safe even without
  // CLI upload filtering. Only the explicit runtime allowlist may be published.
  for (const name of ['index.html', 'manifest.webmanifest', 'sw.js', 'css', 'js', 'img', 'icons', 'assets_src', 'tests', 'README.md']) {
    cpSync(join(root, name), join(work, name), { recursive: true });
  }
  mkdirSync(join(work, 'public'));
  writeFileSync(join(work, 'public', 'stale-secret.txt'), 'must not survive rebuilding');
  for (const ext of ['md', 'psd', 'ai', 'zip', 'pdf']) {
    writeFileSync(join(work, 'img', `not-runtime.${ext}`), 'development fixture');
  }
  const build = spawnSync('sh', ['-c', config.buildCommand], { cwd: work, encoding: 'utf8' });
  assert.equal(build.status, 0, build.stderr);
  const output = join(work, config.outputDirectory);
  const deployed = files(output);
  assert(!existsSync(join(output, 'stale-secret.txt')), 'Build must clean stale output');
  assert(deployed.every(path => /^(index\.html|manifest\.webmanifest|sw\.js|(?:css|js|img|icons)\/.*)$/.test(path)), 'Only runtime files may be published');
  assert(!deployed.some(path => /\.(md|psd|ai|zip|pdf)$/i.test(path)), 'Design files and documents must not be published');
  const context = { self: { addEventListener() {} } };
  runInNewContext(readFileSync(join(output, 'sw.js'), 'utf8'), context);
  for (const asset of context.ASSETS) {
    assert(existsSync(join(output, asset)), `Service worker asset excluded: ${asset}`);
  }
  const html = readFileSync(join(output, 'index.html'), 'utf8');
  for (const [, asset] of html.matchAll(/(?:src|href)="([^"#?]+)"/g)) {
    // This endpoint is provided by Vercel Web Analytics, not the repository.
    if (asset === '/_vercel/insights/script.js') continue;
    if (!/^(?:https?:|data:|\/\/)/.test(asset)) assert(existsSync(join(output, asset)), `HTML asset excluded: ${asset}`);
  }
  for (const path of deployed.filter(path => /\.png$/i.test(path))) {
    assert(statSync(join(output, path)).size <= 500 * 1024, `PNG over 500 KB: ${path}; compress or convert to WebP (<200 KB)`);
  }
  console.log(`✅ Deployment: main-only automation; ${deployed.length} runtime files; all HTML/SW assets present; no oversized PNGs or development files`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
