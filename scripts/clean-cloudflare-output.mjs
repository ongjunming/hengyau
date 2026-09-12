import { rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectories = [
  resolve(projectRoot, 'dist'),
  resolve(projectRoot, '.output'),
  resolve(projectRoot, '.nuxt'),
  resolve(projectRoot, '.nuxt-cloudflare'),
]

for (const outputDirectory of outputDirectories) {
  if (dirname(outputDirectory) !== projectRoot) {
    throw new Error('Refusing to clean an output directory outside the project root.')
  }

  rmSync(outputDirectory, { recursive: true, force: true })
}
