<!--
  better-scroll在决定有多少区域可以滚动时，是根据scrollHeight属性决定的
  scrollHeight属性是根据better-scroll中的content中的子组件高度决定的
  问题：但是首页刚开始是没有将图片高度计算在内的，当图片加载完后，scrollHeight没有进行更新，导致滚动出现了问题
  解决：监听每一张图片是否加载完成，只要一张图片加载完成，就执行refresh()
  -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      scrollY: true, // 开启纵向滚动
      mouseWheel: true, //开启鼠标滚轮
      disableMouse: false, //启用鼠标拖动
      disableTouch: false //启用手指触摸
    })

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    }

    // 3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }

    this.scroll.on('refresh', () => {
      // console.log('refresh')
    })

    this.scroll.on('scrollEnd', () => {
      this.$emit('scrollEnd')
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>
