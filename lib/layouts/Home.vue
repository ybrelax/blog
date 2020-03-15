<template>
  <div class="home">
    <PostsList :posts="$postAll.all" />
  </div>
</template>

<script>
import PostsList from '../components/PostsList.vue'

export default {
  name: 'Home',

  components: {
    PostsList,
  },
}
</script>
