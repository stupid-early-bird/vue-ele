<template>
  <div>
    <v-header :seller="seller"></v-header>
    <ul class="tab">
      <li><router-link to="/shop/goods">商品</router-link></li>
      <li><router-link to="/shop/ratings">评价</router-link></li>
      <li><router-link to="/shop/seller">商家</router-link></li>
    </ul>
    <router-view v-bind:seller="seller"></router-view>
  </div>
</template>

<script>
import header from './header/header'
export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  components: {
    'v-header': header
  },
  created(){
    this.$http.get('../../static//data/data.json').then((res) => {
      this.seller = res.body.seller
    })
  }
}

</script>

<style lang="less">
@import "../common/less/base";
.tab{
  display:flex;
  height:40px;
  width:100%;
  color:rgb(77,85,93);
  font-size:14px;
  line-height:40px;
  .border-1px(rgba(7,17,27,0.1));
  background-color:#fff;
  li{
    flex:1;
    text-align:center;
    a{
      display:inline-block;
      &.active{
        color:rgb(240,20,20);
      }
    }
  }
}
</style>
