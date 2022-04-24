<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>
<style scoped>
.check-button {
  width: 1rem;
  height: 1rem;
  text-align: center;
  line-height: 0.8rem;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #aaa;
}
.check-button img {
  width: 100%;
}
.check {
  background: red;
  border-color: red;
}
</style>
