<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      length: 'cartLength'
    })
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>
<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
}
</style>
