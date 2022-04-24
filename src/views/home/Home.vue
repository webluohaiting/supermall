<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      v-show="isTabFixed"
      ref="tabControl1"
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="handleScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import { goodsList } from './mock'

import { itemListenerMixin, backUpMixin } from 'common/mixin'

import { 
  getHomeMultidata,
  getHomeGoods
} from 'network/home'

export default {
  name: 'Home',
  components: {
    TabControl,
    HomeSwiper,
    RecommendView,
    NavBar,
    Scroll,
    FeatureView,
    GoodsList
  },
  mixins: [itemListenerMixin, backUpMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()

    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off('itemImageLoad', this.itemImgListenter)
  },
  methods: {
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      // 必须结束，再次触底才能重新执行pullingUp,否则只执行一次
      this.$refs.scroll && this.$refs.scroll.finishPullUp()
      if (this.goods[type].page > 2) return
      const page = this.goods[type].page + 1
      getHomeGoods({
        type,
        page
      }).then(res => {
        this.goods[type].list.push(...goodsList[type])
        this.goods[type].page = page
      })
    },

    // 事件监听相关方法
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    handleScroll(position) {
      this.listenShowBackTop(position)
      
      this.isTabFixed = -position.y > this.tabOffsetTop
    },

    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    swiperImageLoad() {
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      // 获取tabControl的offsetTop
      // 所有组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }

  }
}
</script>
<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
  background: var(--color-tint);
  color: #fff;
}
.tab-control {
  /* position: sticky;
  top: 44px; */
  
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* height: calc(100% - 49px);
  overflow: hidden; */

  position: absolute;
  top: 44px;
  bottom: 49px;
  left : 0;
  right: 0;
  overflow: hidden;
}
</style>
