<template>
<div>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="menu-item" v-for="(item,index) in goods" :class="currentIndex===index?'current':''" @click="selectMenu(index)">
					<span class="text">
						<icon-map v-show="item.type>0" :iconType="item.type" :iconSize="24"></icon-map>{{item.name}}
					</span>	
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list" ref="foodList">
					<h1 class="title">{{item.name}}</h1>
		            <ul>
		              <li  v-for="food in item.foods" class="food-item border-1px" @click.stop.prev="viewfood(food)">
		                <div class="icon">
		                  <img width="57" height="57" :src="food.icon">
		                </div>
		                <div class="content">
		                  <h2 class="name">{{food.name}}</h2>
		                  <p class="desc">{{food.description}}</p>
		                  <div class="extra">
		                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
		                  </div>
		                  <div class="price">
		                    <span class="now">￥{{food.price}}</span><span class="old"
		                                                                  v-show="food.oldPrice">￥{{food.oldPrice}}</span>
		                  </div>
		                  <div class="cartcontrol-wrapper">
		                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
		                  </div>
		                </div>
		              </li>
		            </ul>
				</li>
			</ul>
		</div>
	</div>
	<shopcart ref="shopcart" :selectedFoods="selectedFoods" :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"></shopcart>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
</div>
</template>
<script type="text/ecmascript-6">
import iconMap from '../iconMap/iconMap'
import cartcontrol from '../cartcontrol/cartcontrol'
import shopcart from '../shopcart/shopcart'
import food from '../food/food'
import BScroll from 'better-scroll'
export default {
props: {
  seller: {
    type: Object
  }
},
data() {
  return {
    goods: [],
    heigthArry: [],
    scrollY: 0,
    selectedFood: {}
  }
},
components: {
  iconMap: iconMap,
  cartcontrol: cartcontrol,
  shopcart,
  food
},
created() {
	this.$http.get('../../../static/data/data.json').then((res) => {
      this.goods = res.body.goods
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    })
},
methods: {
  _initScroll() {
    this.meunScroll = new BScroll(this.$refs.menuWrapper, {
      click: true
    })

    this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
      click: true,
      probeType: 3 // 监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发
    })

    this.foodsScroll.on('scroll', (pos) => {
      this.scrollY = Math.abs(Math.round(pos.y))
    })
  },
  _calculateHeight() {
    let foodList = this.$refs.foodList
    let height = 0
    this.heigthArry.push(height)
    for (let i = 0; i < foodList.length; i++) {
      let item = foodList[i]
      height += item.clientHeight
      this.heigthArry.push(height)
    }
  },
  selectMenu(index) {
    let height = this.heigthArry[index]
    this.foodsScroll.scrollTo(0, -height, 300) // 注意是负方向,做个延时
    this.scrollY = height
  },
  addFood(target) {
    // 体验优化,异步执行下落动画
    this.$nextTick(() => {
      this.$refs.shopcart.drop(target)
    })
  },
  viewfood(food) {
  	this.selectedFood = food
  	this.$refs.food.show()
  }
},
computed: {
  currentIndex: function() {
    for (let i = 0; i < this.heigthArry.length; i++){
      if (i === (this.heigthArry.length - 1)) {
        return i
    } else {
      if (this.scrollY >= this.heigthArry[i] && this.scrollY < this.heigthArry[i + 1]) {
        return i
      }
    }
    }
    return 0
  },
  selectedFoods() {
  	let selectedFoodsArry = []
  	this.goods.forEach(function(item, index) {
      item.foods.forEach(function(food, j) {
      	if (food.count) {
          selectedFoodsArry.push(food)
      	}
      })
  	})
  	return selectedFoodsArry
  }
}

}

</script>
<style lang="less">
@import "../../common/less/base";
.goods{
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item{
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        &.current{
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          .text{
            .border-none();
          }
        }
        .text{
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          .border-1px(rgba(7, 17, 27, 0.1));
          font-size: 12px;
        }
      }
    }
    .foods-wrapper{
      flex: 1;
      .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child{
          .border-none();
          margin-bottom: 0;
        }
        .icon{
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content{
          flex: 1;
          .name{
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc, .extra{
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc{
            line-height: 12px;
            margin-bottom: 8px;
          }
          .extra{
            .count{
              margin-right: 12px;
            }
          }
          .price{
            font-weight: 700;
            line-height: 24px;
            .now{
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old{
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
}
</style>
