<template>
	<div class="cartcontrol">
	    <transition name="move">
	      <div class="cart-decrease" v-show="food.count>0" @click.stop.prev="decreaseCount">
	        <span class="inner icon-remove_circle_outline"></span>
	      </div>
	    </transition>
	    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
	    <div class="cart-add icon-add_circle" @click.stop.prev="addCount"></div>
	</div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
export default{
props: {
  food: {
    type: Object
  }
},
methods: {
  addCount: function(event) { // 这里count是food里原来没有的数据，需要用set
    if (!this.food.count){
      Vue.set(this.food, 'count', 1)
    } else {
      this.food.count++
    }
    this.$emit('add', event.target)
  },
  decreaseCount: function() {
    if (this.food.count){
      this.food.count--
    }
  }
}
}

</script>
<style lang="less">
.cartcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding: 6px;
      opacity: 1;
      .inner{
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        transform: rotate(0);
      }
      &.move-enter-active, &.move-leave-active{
        transition: all 0.4s linear;
        .inner{
          transition: all 0.4s linear;
        }
      }
      &.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .cart-add{
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }

</style>
