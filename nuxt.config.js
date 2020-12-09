export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  // ssr: false,
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'online-blade-formatter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/http',
    '@nuxtjs/axios',
    '@nuxtjs/svg',
  ],
  http: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },
  publicRuntimeConfig: {
    http: {
      browserBaseURL: process.env.BASE_URL || 'http://localhost:3000',
    },
  },

  privateRuntimeConfig: {
    http: {
      baseURL: process.env.BASE_URL,
    },
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  purgeCSS: {
    whitelist: ['dark-mode'],
  },
  serverMiddleware: [{ path: '/v1', handler: '~/api/rest' }],
}
