<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'TarBar'
}
</script>
<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 1px rgb(100, 100, 100, .2);
}
</style>
