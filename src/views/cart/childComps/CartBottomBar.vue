<template>
  <div class="bottom-bar">
    <div class="check-content" @click="checkClick">
      <check-button :is-checked="isSelectAll" class="check-button" />
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{ totalPrice }}
    </div>
    <div class="calculate" @click="calcClick">
      去计算: {{ checkLength }}
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton"
import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList
      .filter(item => item.checked)
      .reduce((sum, i) => sum + i.price * i.count, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // return !(this.cartList.filter(item => !item.checked).length)
      if (!this.cartList.length) return
      return !(this.cartList.find(item => !item.checked))
    }
  },
  created() {
    
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品')
      }
    }
  }
}
</script>
<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  line-height: 40px;
  background: #ddd;
}
.check-content {
  display: flex;
  align-items: center;
  width: 100px;
}
.check-content span {
  margin: 0 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 120px;
  text-align: center;
  color: #fff;
  background: red;
  
}
</style>
