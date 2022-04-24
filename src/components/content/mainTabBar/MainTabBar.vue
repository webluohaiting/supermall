<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="#ffa500">
      <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home-active.png" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" active-color="#ffa500">
      <img slot="item-icon" src="~assets/img/tabbar/sort.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/sort-active.png" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" active-color="#ffa500">
      <img slot="item-icon" src="~assets/img/tabbar/bookshelf.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/bookshelf-active.png" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" active-color="#ffa500">
      <img slot="item-icon" src="~assets/img/tabbar/user.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/user-active.png" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
import tabBar from 'components/common/tabbar/TabBar'
import tabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  name: 'MainTabBar',
  components: {
    tabBar,
    tabBarItem
  }
}
</script>
<style scoped>
</style>
