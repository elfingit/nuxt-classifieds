module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'classifieds',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Classifieds on nuxt.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  modules: [
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      locales: [
        {
          name: 'English',
          code: 'en',
          iso: 'en-US',
          file: 'en-US.js'
        }
      ],
      lazy: true,
      langDir: 'locales/',
      defaultLocale: 'en'
    }]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    '~assets/main.scss'
  ],

  plugins: [
    { src: '~/plugins/vue-notification', ssr: false }
  ]
}

