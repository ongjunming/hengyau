import { existsSync, readFileSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const redirectsFile = resolve(projectRoot, 'dist', '_redirects')

if (existsSync(redirectsFile)) {
  const redirects = readFileSync(redirectsFile, 'utf8').trim()

  // Nitro emits this legacy 404 rule for the Pages preset, but Cloudflare only
  // accepts redirect status codes and already serves dist/404.html itself.
  if (redirects === '/* /404.html 404') {
    rmSync(redirectsFile)
  }
}
