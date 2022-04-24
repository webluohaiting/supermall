<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item="item"
      />
    </scroll>
  </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'

import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters([ 'cartList' ])
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>
<style scoped>
.content {
  height: calc(100vh - 44px - 40px - 49px);
  overflow: hidden;
}
</style>
