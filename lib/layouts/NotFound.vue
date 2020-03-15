<template>
  <div class="main-div not-found">
    <h1>404 Not Found</h1>

    <p>{{ $themeConfig.lang.notFound }}</p>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="less" scoped>
.not-found {
  text-align: center;
}
</style>
