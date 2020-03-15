<template>
  <div class="banner">
    <div class="container">
      <div class="center">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeaderBanner',
}
</script>

<style lang="less" scoped>
@import "~@theme/styles/variables";

.banner {
  cursor: default;
  height: @bannerHeight;
  border-bottom: 1px solid @borderColor;
  color: @headerTitleColor;
  .container {
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .center {
      z-index: 19;
      text-align: center;
      transition: all 0.2s ease-in-out;
      color: @textColor;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
