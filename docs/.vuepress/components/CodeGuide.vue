<template>
  <div class="custom-pages">
    <div class="main-div">
      <TOC />
      <p>
        良好的规范能对代码的质量起到很好提升作用。所有无论团队还是个人都需要自己的代码规范;这是对于代码编写有很好的帮助作用
      </p>
    </div>

    <div class="main-div">
      <Content />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeGuide',
  data () {
    return {
      titles: [],
    }
  },
  mounted () {
    const headers = this.$page.headers
    this.titles = headers.filter(item => item.level === 2)
    console.log('titles:', this.titles)
  },
}
</script>
