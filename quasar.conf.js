// Configuration for your app
// require('es6-promise').polyfill()
module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
      // distDir: '../../apache-tomcat-9.0.14/webapps/ROOT/'
    },
    devServer: {
      // https: true,
      port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
          target: 'http://172.30.1.52:8889/api',
          // target: 'http://localhost/api',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '' // '/api/login-kakao' -> 'http://localhost:8001/login-kakao'
          }
        }
      }
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      config: {
        cordova: {
          backButtonExit: true // Quasar handles app exit on mobile phone back button
        }
      },
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QFab',
        'QFabAction',
        'QVideo',
        'QRating',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QField',
        'QInput',
        'QLayoutFooter',
        'QPageSticky',
        'QChatMessage',
        'QPullToRefresh',
        'QUploader',
        'QSearch',
        'QBtnToggle',
        'QModal',
        'QModalLayout',
        'QProgress',
        'QChip',
        'QSelect',
        'QOptionGroup',
        'QInfiniteScroll',
        'QRadio',
        'QSpinner',
        'QSpinnerOval',
        'QSpinnerHearts',
        'QCheckbox',
        'QToggle',
        'QItemSeparator',
        'QItemTile',
        'QDatetime',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl',
        'QPopover',
        'QParallax',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QCollapsible',
        'QTooltip',
        'QScrollArea'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Loading'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [
      'fadeIn',
      'fadeOut'
    ],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
      id: 'kr.oneon.sellerz',
      // iosStatusBarPadding: true, // add the dynamic top padding on iOS mobile devices
      backButtonExit: true // Quasar handles app exit on mobile phone back button
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
