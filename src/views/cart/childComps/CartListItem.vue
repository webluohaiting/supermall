<template>
  <div class="cart_list_item">
    <check-button
      @click.native="checkClick"
      :is-checked="item.checked"
      ref="checkButtonRef"
    />
    <div class="item_img" @click="checkClick">
      <img :src="item.image" alt="" />
    </div>
    <div class="item_info" @click="infoClick(item)">
      <p class="item_title">{{ item.title }}</p>
      <p class="item_desc">{{ item.desc }}</p>
      <span class="item_price">￥{{ item.price }}</span>
      <span class="item_count">x{{ item.count }}</span>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  props: {
    item: Object
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      this.item.checked = !this.item.checked;
    },
    //信息点击事件
    infoClick(item) {
      this.$router.push("/detail/" + item.iid);
    }
  }
};
</script>

<style scoped>
.cart_list_item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.4rem;
  height: 5.5rem;
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
}

.item_img {
  flex: 1;
  width: 3.5rem;
  height: 100%;
  margin: 0 0.5rem;
  border-radius: 0.4rem;
  overflow: hidden;
}
.item_img img {
  width: 100%;
}

.item_info {
  position: relative;
  width: calc(100% - 3.5rem - 1rem - 0.8rem - 1rem);
  height: 100%;
  margin-left: 0.4rem;
}
.item_info p {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item_title {
  font-size: 0.75rem;
  padding-bottom: 0.5rem;
}
.item_desc {
  font-size: 0.6rem;
  color: gray;
}
.item_price {
  position: absolute;
  left: 0;
  bottom: 0.4rem;
  font-size: 0.75rem;
  color: orangered;
}
.item_count {
  position: absolute;
  right: 0.4rem;
  bottom: 0.4rem;
  font-size: 0.75rem;
}
</style>
