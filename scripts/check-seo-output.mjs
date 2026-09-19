import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const outputRoot = resolve(process.cwd(), 'dist')
const pages = [
  { file: 'index.html', path: '/', schemaTypes: ['LocalBusiness', 'FAQPage'] },
  { file: 'malaysia-dragon-incense/index.html', path: '/malaysia-dragon-incense', schemaTypes: ['BreadcrumbList', 'FAQPage'] },
  { file: 'dragon-incense-size-guide/index.html', path: '/dragon-incense-size-guide', schemaTypes: ['BreadcrumbList', 'FAQPage'] },
  { file: 'temple-festival-incense-customisation/index.html', path: '/temple-festival-incense-customisation', schemaTypes: ['BreadcrumbList', 'FAQPage'] },
]

const fail = (message) => {
  throw new Error(`SEO output check failed: ${message}`)
}

for (const page of pages) {
  const html = readFileSync(resolve(outputRoot, page.file), 'utf8')
  const expectedUrl = `https://hengyau.com${page.path === '/' ? '' : page.path}`

  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${page.path} is missing a title`)
  if (!/<meta name="description" content="[^"]+">/.test(html)) fail(`${page.path} is missing a meta description`)
  if (!html.includes(`<link rel="canonical" href="${expectedUrl}">`)) fail(`${page.path} has an incorrect canonical URL`)

  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length
  if (h1Count !== 1) fail(`${page.path} must contain exactly one h1; found ${h1Count}`)

  const jsonLdScripts = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  if (!jsonLdScripts.length) fail(`${page.path} is missing JSON-LD`)

  const serialized = jsonLdScripts.map((match) => {
    JSON.parse(match[1])
    return match[1]
  }).join('\n')

  for (const schemaType of page.schemaTypes) {
    if (!serialized.includes(`"${schemaType}"`)) fail(`${page.path} is missing ${schemaType} schema`)
  }
}

const sitemap = readFileSync(resolve(outputRoot, 'sitemap.xml'), 'utf8')
for (const page of pages) {
  const expectedUrl = `https://hengyau.com${page.path}`
  if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) fail(`sitemap is missing ${expectedUrl}`)
}

const robots = readFileSync(resolve(outputRoot, 'robots.txt'), 'utf8')
if (!robots.includes('Sitemap: https://hengyau.com/sitemap.xml')) fail('robots.txt is missing the production sitemap')

const llms = readFileSync(resolve(outputRoot, 'llms.txt'), 'utf8')
for (const page of pages.slice(1)) {
  if (!llms.includes(`https://hengyau.com${page.path}`)) fail(`llms.txt is missing ${page.path}`)
}

console.log(`SEO output check passed (${pages.length} indexable pages).`)
