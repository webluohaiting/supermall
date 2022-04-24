import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListenter: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListenter = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListenter)
    console.log('混入成功')
  }
}

export const backUpMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }
  }
}
