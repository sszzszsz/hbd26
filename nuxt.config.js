import path from 'path'
import StylelintPlugin from 'stylelint-webpack-plugin'
// path
// const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
// const baseDir = process.env.BASE_DIR || '/'

const site = {
  title: 'SPECIAL TICKETS | Happy BirthDay 26th',
  titleDes: 'Happy 26th birthday! - お願いを聞いてあげる券',
  titleShort: 'HBD26th',
}
export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  target: 'static', // default is 'server'
  htmlAttrs: {
    lang: 'ja',
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: site.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
      { hid: 'description', name: 'description', content: site.titleDes },
      // ogp関連
      { hid: 'og:site_name', property: 'og:site_name', content: site.title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://hbd26.netlify.com/' },
      { hid: 'og:title', property: 'og:title', content: site.title },
      { hid: 'og:description', property: 'og:description', content: site.titleDes },
      { name: 'twitter:card', content: 'summary_large_image' },
      // pwa iOS
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      // splashscreens
      {
        href: '/splashscreens/iphonex_splash.png',
        rel: 'apple-touch-startup-image',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        href: '/splashscreens/iphonexsmax_splash.png',
        rel: 'apple-touch-startup-image',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        href: '/splashscreens/ipadpro1_splash.png',
        rel: 'apple-touch-startup-image',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        href: '/splashscreens/ipadpro2_splash.png',
        rel: 'apple-touch-startup-image',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        href: '/splashscreens/ipadpro3_splash.png',
        rel: 'apple-touch-startup-image',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },

  /*
   ** Global CSS (https://go.nuxtjs.dev/config-css)
   */
  css: ['~/assets/scss/style.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '~/plugins/routerOption.js',
      mode: 'client',
    },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/pwa',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    // 'nuxt-user-agent',
    'nuxt-webfontloader',
  ],
  /*
   * @nuxtjs/pwa Configuration
   * https://pwa.nuxtjs.org/
   */
  pwa: {
    icon: {
      source: 'static/icon/icon.png',
    },
    manifest: {
      name: site.titleShort,
      lang: 'ja',
      short_name: site.titleShort,
      title: site.title,
      'og:title': site.title,
      description: site.titleDes,
      'og:description': site.titleDes,
      theme_color: '#6c655d',
      background_color: '#fdfaf3',
      display: 'standalone',
    },
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  styleResources: {
    scss: ['~/assets/scss/_variable.scss'],
  },

  webfontloader: {
    google: {
      families: ['Josefin+Sans:400,500,700', 'Noto+Sans+JP:500,600'],
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient && isDev) {
        config.devtool = 'source-map'
        // Run ESLint on save
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })

        config.plugins.push(
          new StylelintPlugin({
            files: ['**/*.vue', '**/*.scss'],
          })
        )
      }

      // isDev が true の場合、webpack を開発モードに設定します
      if (isDev) {
        config.mode = 'development'
      }

      // import alias
      config.resolve.alias.Sass = path.resolve(__dirname, './assets/scss/')
      config.resolve.alias.Images = path.resolve(__dirname, './assets/img/')
      config.resolve.alias['~'] = path.resolve(__dirname)
      config.resolve.alias['@'] = path.resolve(__dirname)
    },
    transpile: ['gsap'],
    terser: {
      terserOptions: {
        compress: { drop_console: true },
      },
    },
  },
}
