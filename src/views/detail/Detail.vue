<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @titleClick="titleClick" />
    <scroll ref="scroll" :probe-type="3" class="content" @scroll="contentScroll" @scrollEnd="scrollEnd">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- <toast :message="message" :show="isShow" /> -->
  </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import Toast from 'components/common/toast/Toast'

import { detail, recommend } from './mock'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'

import { itemListenerMixin, backUpMixin } from 'common/mixin'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast
  },
  mixins: [itemListenerMixin, backUpMixin],
  data() { 
    return {
      goodsId: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isScroll: false,
      message: '',
      isShow: false
    }
  },
  created() {
    this.goodsId = this.$route.params.goodsId
    this.getDetail()
    this.getRecommend()
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListenter)
  },
  methods: {
    ...mapActions(['addCart']),
    getDetail() {
      getDetail({
        id: this.goodsId
      }).then(res => {
        this.topImages = detail.result.itemInfo.topImages
        this.goods = new Goods(detail.result.itemInfo, detail.result.columns, detail.result.shopInfo.services)
        this.shop = new Shop(detail.result.shopInfo)
        this.detailInfo = detail.result.detailInfo
        this.paramInfo = new GoodsParam(detail.result.itemParams.info, detail.result.itemParams.rule)

        if (detail.result.rate.cRate !== 0) {
          this.commentInfo = detail.result.rate.list[0]
        }
      })
    },
    getRecommend() {
      getRecommend().then(res => {
        this.recommends = recommend.list
      })
    },
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    titleClick(index) {
      this.isScroll = true
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
    },
    contentScroll(position) {
      this.listenShowBackTop(position)
      if (this.isScroll) return
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // || (i === length - 1 && positionY >= this.themeTopYs[i]))
        if ((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = i
        }
      }
    },
    scrollEnd() {
      this.isScroll = false
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.goodsId

      // 2.将商品添加到购物车里
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product)
      //   .then(res => {
      //     console.log(res)
      //   })
      this.addCart(product).then(res => {
        this.$toast.show(res, 3000)
      })
    }
  }
}
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 101;
  background: #fff;
}
.content {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>
