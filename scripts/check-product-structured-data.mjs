import { readFile } from 'node:fs/promises'

const htmlPath = process.argv[2] ?? 'dist/index.html'
const html = await readFile(htmlPath, 'utf8')
const jsonLdBlocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  .map((match) => JSON.parse(match[1]))

if (jsonLdBlocks.length === 0) {
  throw new Error(`No JSON-LD blocks found in ${htmlPath}`)
}

const products = []
const offerCatalogs = []

const visit = (value) => {
  if (!value || typeof value !== 'object') return
  if (Array.isArray(value)) {
    value.forEach(visit)
    return
  }

  const types = Array.isArray(value['@type']) ? value['@type'] : [value['@type']]
  if (types.includes('Product')) products.push(value)
  if (types.includes('OfferCatalog')) offerCatalogs.push(value)

  Object.values(value).forEach(visit)
}

jsonLdBlocks.forEach(visit)

const invalidProducts = products.filter((product) => (
  !product.offers && !product.review && !product.aggregateRating
))
const catalogItems = offerCatalogs.flatMap((catalog) => catalog.itemListElement ?? [])
const serviceItems = catalogItems.filter((offer) => {
  const types = Array.isArray(offer.itemOffered?.['@type'])
    ? offer.itemOffered['@type']
    : [offer.itemOffered?.['@type']]
  return types.includes('Service')
})

if (catalogItems.length === 0) {
  throw new Error('The JSON-LD OfferCatalog must retain its catalogue items.')
}

if (invalidProducts.length > 0) {
  console.error('Invalid Google Product snippet nodes:')
  invalidProducts.forEach((product) => console.error(`- ${product.name ?? '(unnamed Product)'}`))
  console.error('Each Product must include offers, review, or aggregateRating.')
  process.exitCode = 1
} else {
  console.log(`Structured data check passed (${products.length} Product nodes, ${serviceItems.length} Service catalogue items).`)
}
