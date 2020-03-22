const path = require('path')

module.exports = {
  title: '每天过好一点',
  head: [
    ['link', { rel: 'icon', href: 'https://avatars1.githubusercontent.com/u/31029938?s=40&v=4' }],
  ],
  description: 'personal blog for yb',
  port: 2333,
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },

  evergreen: true,

  plugins: [
    ['@vuepress/google-analytics', {
      ga: 'UA-132770851-2',
    }],
  ],

  chainWebpack: (config, isServer) => {
    if (isServer === false) {
      config.optimization.splitChunks({
        maxInitialRequests: 5,
        cacheGroups: {
          vue: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vssue)[\\/]/,
            name: 'vendor.vue',
            chunks: 'all',
          },
          commons: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'vendor.commons',
            chunks: 'all',
          },
        },
      })
    }
  },

  theme: path.resolve(__dirname, '../../lib'),

  themeConfig: {
    // lang: require(path.resolve(__dirname, '../../lib/langs/en-US')),
    lang: require(path.resolve(__dirname, '../../lib/langs/zh-CN')),
    // lang: require(path.resolve(__dirname, '../../lib/langs/pt-BR')),

    personalInfo: {
      nickname: 'ybrelax',
      description: 'Happy in life',
      email: 'shihuaidetiankong@gmail.com',
      location: 'shenZhen City, China',

      avatar: '/assets/img/avatar.jpg',

      sns: {
        github: {
          account: 'ybrelax',
          link: 'https://github.com/ybrelax',
        },
      },
    },

    header: {
      background: {
        // url: '/assets/img/avatar.jpg',
        useGeo: true,
      },
      showTitle: true,
    },

    lastUpdated: true,

    nav: [
      { text: '主页', link: '/', exact: true },
      { text: '代码', link: '/coding/', exact: false },
      { text: '生活', link: '/books/', exact: false },
      { text: '文档', link: '/custom-pages/', exact: false },
      { text: 'Github', link: 'https://github.com/ybrelax' },
    ],

    comments: {
      owner: 'ybrelax',
      repo: 'blog',
      clientId: '670283a1e3e0c7668bbb',
      clientSecret: '7bf05e11d716c504d07db3db49443fe4cc3870c1',
      autoCreateIssue: true,
    },
  },
}
