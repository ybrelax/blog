<template>
  <div class="posts">
    <PostsList :posts="posts" />
  </div>
</template>

<script>
import PostsList from '../components/PostsList.vue'

export default {
  name: 'Posts',

  components: {
    PostsList,
  },

  data () {
    return {
      posts: null,
    }
  },

  created () {
    this.posts = this.$books
  },
}
</script>
