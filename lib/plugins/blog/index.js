const path = require('path')
const format = require('date-fns/format')

module.exports = ({
  postsDir = 'coding',
  lifeDir = 'life',
  postsLayout = 'Post',
  permalink = '/posts/:year/:month/:day/:slug.html',
  lang,
}) => {
  const ensureBothSlash = str => str.replace(/^\/?(.*)\/?$/, '/$1/')
  return {
    name: '@theme-meteorlxy/vuepress-plugin-blog',
    plugins: [
      [require('../blog-vuepress'), {
        categoryIndexPageUrl: '/posts/categories/',
        tagIndexPageUrl: '/posts/tags/',
        postsDir,
        lang,
      }],
    ],

    extendPageData ($page) {
      const setMetaData = () => {
        $page.frontmatter.layout = $page.frontmatter.layout || postsLayout
        $page.frontmatter.permalink = $page.frontmatter.permalink || permalink
        $page.top = $page.frontmatter.top || false
        $page.tags = $page.frontmatter.tags || []
        $page.category = $page.frontmatter.category
        $page.createdAt = $page.frontmatter.date ? format($page.frontmatter.date, 'YYYY-MM-DD') : null
        $page.updatedAt = $page.lastUpdated ? format($page.lastUpdated, 'YYYY-MM-DD') : null
      }
      // Test the page if is a post according to the postsDir
      if ($page.path.startsWith(ensureBothSlash(postsDir))) {
        setMetaData()
        $page.type = 'post'
      }
      if ($page.path.startsWith(ensureBothSlash(lifeDir))) {
        setMetaData()
        $page.type = 'life'
      }
    },

    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceApp.js'),
    ],
  }
}
