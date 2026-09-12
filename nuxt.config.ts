/// <reference path="./types/node-process.d.ts" />

import process from 'node:process'

const deploymentEnv = process.env

const siteUrl = (
  deploymentEnv.NUXT_PUBLIC_SITE_URL
  || deploymentEnv.CF_PAGES_URL
  || 'https://heng-yau-enterprise.developer47122.chatgpt.site'
).replace(/\/+$/, '')

const isPreviewDeployment = deploymentEnv.CF_PAGES === '1'
  && Boolean(deploymentEnv.CF_PAGES_BRANCH)
  && deploymentEnv.CF_PAGES_BRANCH !== 'main'

const preventIndexing = isPreviewDeployment
  || (deploymentEnv.CF_PAGES === '1' && !deploymentEnv.NUXT_PUBLIC_SITE_URL)

export default defineNuxtConfig({
  compatibilityDate: '2026-09-10',
  buildDir: deploymentEnv.CF_PAGES === '1' ? '.nuxt-cloudflare' : undefined,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hans' },
      title: '兴耀企业｜龙香与寺庙用香',
      meta: [
        {
          name: 'description',
          content:
            '兴耀企业匠心制作龙香，提供适合庙庆、神诞、寺庙与传统祭祀使用的香品。',
        },
        { name: 'theme-color', content: '#241815' },
        { name: 'color-scheme', content: 'light' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  runtimeConfig: {
    public: {
      whatsappNumber: '60163633329',
      siteUrl,
      preventIndexing,
    },
  },
  nitro: {
    prerender: {
      routes: ['/', '/robots.txt', '/sitemap.xml', '/llms.txt'],
    },
  },
})
