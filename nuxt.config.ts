/// <reference path="./types/node-process.d.ts" />

import process from 'node:process'

const deploymentEnv = process.env

const cloudflareSiteUrl = deploymentEnv.CF_PAGES_BRANCH === 'main'
  ? deploymentEnv.CF_PAGES_URL?.replace(
      /^https:\/\/[^.]+\.([^.]+\.pages\.dev)\/?$/,
      'https://$1',
    )
  : deploymentEnv.CF_PAGES_URL

const siteUrl = (
  deploymentEnv.NUXT_PUBLIC_SITE_URL
  || cloudflareSiteUrl
  || 'https://heng-yau-enterprise.developer47122.chatgpt.site'
).replace(/\/+$/, '')

const isPreviewDeployment = deploymentEnv.CF_PAGES === '1'
  && Boolean(deploymentEnv.CF_PAGES_BRANCH)
  && deploymentEnv.CF_PAGES_BRANCH !== 'main'

const preventIndexing = isPreviewDeployment
  || (deploymentEnv.CF_PAGES === '1' && !deploymentEnv.NUXT_PUBLIC_SITE_URL)

export default defineNuxtConfig({
  compatibilityDate: '2026-09-10',
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
      link: [
        {
          rel: 'icon',
          type: 'image/webp',
          href: '/images/heng-yau-logo-transparent-v6.webp?v=7',
        },
        {
          rel: 'shortcut icon',
          type: 'image/webp',
          href: '/images/heng-yau-logo-transparent-v6.webp?v=7',
        },
        {
          rel: 'apple-touch-icon',
          href: '/images/heng-yau-logo-transparent-v6.webp?v=7',
        },
      ],
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
