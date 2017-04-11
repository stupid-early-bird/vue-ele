<template>
<div>
  <div class="header">
    <div class="map">
      <div class="location">
        <span class="icon-map"></span>
        <span class="address">
          天河区珠江新城花城大道远洋大厦
        </span>
        <span class="triangle"></span>
      </div>
      <div class="tqyb">
        <div class="detail">
          <h2 class="wd">27°</h2>
          <p class="tq">阴</p>
        </div>
        <div class="tqicon">
          <span class="icon-cloud"></span>
        </div>
      </div>
    </div>
    <form action="">
      <input class="sousuo" type="text" placeholder="搜索商家、商品">
    </form>
    <div class="favlist">
      <a v-for="item in hotSearchWords" href="">{{item.word}}</a>
    </div>
  </div>
  <swipe class="foodsType_wrapper"  :auto="0">
    <swipe-item class="foodsType_page" v-for="page in foodsType_totalPage">
      <a class="foodsType" v-for="index in 8">
        <div class="img_wrapper">
          <img class="image" :src="imgBaseUrl+foodTypes[(page-1)*8+index-1].image_url" alt="">
        </div>
        <span class="title">{{foodTypes[(page-1)*8+index-1].title}}</span>
      </a>
    </swipe-item>
  </swipe>
  <div class="sellers_wrapper">
    <div class="sellers_header">推荐商家</div>
    <div class="sellers_content">
      <div class="sellers_item" v-for="item in restaurants">
        <div class="avater">
          <img :src="getImgPath(item.image_path)" alt="">
        </div>
        <div class="seller_right">
          <div class="toper">
            <span v-show="item.is_premium" class="brand">品牌</span>
            <span class="title">{{item.name}}</span>
            <ul class="shop_detail_ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
            </ul>
          </div>
          <div class="middle">
            <star :score="item.rating" :size="24"></star>
            <span class="rating">{{item.rating}}</span>
            <span class="sellnum">月售{{item.recent_order_num}}单</span>
            <section class="rating_order_num_right" v-if="item.delivery_mode">
              <span class="delivery_style delivery_left">{{item.delivery_mode.text}}</span>
              <span class="delivery_style delivery_right">准时达</span>
            </section>
          </div>
          <div class="footer">
            <section class="mindel">
              ￥{{item.float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </section>
            <section class="distance_time">
              <span>{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
                <span class="segmentation">/</span>
              </span>
              <span class="order_time">{{item.order_lead_time}}分钟</span>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import msiteFoodTypes from '../service/getData'
require('vue-swipe/dist/vue-swipe.css')
import {imgBaseUrl} from '../config/env'
import { Swipe, SwipeItem } from 'vue-swipe'
import { getImgPath } from '../common/js/util'
import star from './common/star/star'
export default {
  data () {
    return {
      // geohash: 'wtw3sjwhgjt', // 地址
      foodTypes: [], // 食品分类列表
      hotSearchWords: [], // 搜索热词
      restaurants: [], // 推荐商家
      imgBaseUrl
    }
  },
  created () {
    this.$http.get('../../static/data/foodTypes.json').then(res => {
      this.foodTypes = res.body
    })
    this.$http.get('../../static/data/hot_search_words.json').then(res => {
      this.hotSearchWords = res.body
    })
    this.$http.get('../../static/data/restaurants.json').then(res => {
      this.restaurants = res.body
    })
  },
  computed: {
    foodsType_totalPage: function () {
      return Math.ceil(this.foodTypes.length / 8)
    }
  },
  components: {
    swipe: Swipe,
    swipeItem: SwipeItem,
    star: star
  },
  mixins: [getImgPath]
}
</script>

<style lang="less">
@import "../common/less/z.less";
.header{
  padding:10px 14px;
  background-color: #0096ff;
  .map{
    position: relative;
    width:100%;
    height:35px;
    .location{
      width:220px;
      overflow: hidden;
      color:#fff;
      font-size:0;
      .icon-map{
        display:inline-block;
        font-size:15px;
        vertical-align: top;
        margin-top:1.5px;
      }
      .address{
        display:inline-block;
        width:167px;
        overflow: hidden;
        font-size:18px;
        white-space:nowrap;
        margin:0 5px;
        vertical-align: top;
      }
      .triangle{
        display:inline-block;
        margin-top:8px;
        .triangle-b(5px,#fff);
      }
    }
    .tqyb{
      position:absolute;
      top:0;
      right:0;
      color:#fff;
      display:flex;
      .detail{
        flex:0 0 22px;
        .wd{
          display: block;
          font-size:12px;
          font-weight: 400;
        }
        .tq{
          display: block;
          font-size:8px;
          font-weight: 400;
        }
      }
      .tqicon{
        flex:1;
        .icon-cloud{
          font-size:27px;
        }
      }
    }
  }
  .sousuo{
    display:block;
    width:100%;
    margin:7px 0;
    height:35px;
    text-align: center;
    border-radius:24px;
    box-shadow: 1px 3px rgba(0,0,0,0.2);
    color:#333;
    font-size:14px;
    background-color: #fff;
  }
  .favlist{
    display:flex;
    align-items: center;
    white-space: nowrap;
    overflow-x: auto;
    a{
      margin-right:15px;
      color:#fff;
      font-size:14px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
}
.foodsType_wrapper{
  position: relative;
  height:177px !important;
  background-color: #fff;
  overflow: hidden;
  .foodsType_page{
    height:100%;
    width:100%;
    .foodsType{
      display:inline-block;
      float:left;
      width:25%;
      height:63px;
      margin-top:10px;
      text-align: center;
      .img_wrapper{
        display: inline-block;
        width:45px;
        height:45px;
        img{
          width:45px;
          height:45px;
        }
      }
      .title{
        display: block;
        margin-top:5px;
        color: #666;
        font-size:14px;
      }
    }
  }
  .mint-swipe-indicators{
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    .mint-swipe-indicator{
      width: 4px;
      height: 4px;
      display: inline-block;
      border-radius: 100%;
      background: #000;
      opacity: .2;
      margin: 0 2px;
      &.is-active {
        background-color: #000;
        opacity: .6;
      }
    }
  }
}
.sellers_wrapper{
  position: relative;
  width:100%;
  margin-top:10px;
  background-color: #fff;
  padding-bottom: 46px;
  .sellers_header{
    height:35px;
    padding-left:15px;
    font-size:15px;
    font-weight: 600;
    line-height: 35px;
    border-bottom: 1px solid #eee;
  }
  .sellers_content{
    .sellers_item{
      padding:15px 0;
      box-sizing: border-box;
      display: flex;
      border-bottom: 1px solid #eee;
      .avater{
        flex:0 0 90px;
        width:70px;
        height:70px;
        padding: 0 10px;
        box-sizing: border-box;
        img{
          width:70px;
          height:70px;
        }
      }
      .seller_right{
        flex:1;
        padding-right: 10px;
        .toper{
          vertical-align: top;
          font-size: 0;
          .brand{
            display: inline-block;
            background-color: #ffd930;
            padding:1px 2px;
            font-size: 10px;
            margin-right: 5px;
            font-weight: 600;
            vertical-align: top;
          }
          .title{
            display: inline-block;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            max-width:180px;
            font-size: 15px;
            font-weight: 600;
            color:#333;
          }
          .shop_detail_ul{
            display:flex;
            float:right;
            .supports{
              flex:1;
              font-size:12px;
              font-weight: 700;
              color:#999;
              padding:0.5px;
              margin-left:1px;
              border-color: rgb(221, 221, 221);
            }
          }
        }
        .middle{
          margin-top:12px;
          font-size: 0px;
          .star{
            display: inline-block;
          }
          .rating{
            margin:0 5px;
            color:#ff6000;
            font-size:12px;
          }
          .sellnum{
            font-size:12px;
            color:#666;
          }
          .rating_order_num_right{
            float:right;
            .delivery_style{
              font-size:10px;
              padding:1px 2px;
              border-radius:0.6px;
              font-weight: 700;
            }
            .delivery_left{
              color:#fff;
              background-color: #3190e8;
              border:0.1px solid #3190e8;
            }
            .delivery_right{
              color:#3190e8;
              border:0.1px solid #3190e8;
            }
          }
        }
        .footer{
          margin-top:12px;
          font-size: 0px;
          .mindel{
            display: inline-block;
            font-size: 12px;
            color: #999;
            font-weight: 400;
          }
          .distance_time{
            font-size: 12px;
            color: #999;
            font-weight: 400;
            float:right;
            .order_time{
              color:#2395ff;
            }
          }

        }
      }
    }
  }
}
</style>
