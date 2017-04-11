<template>
  <div id="app">
    <router-view></router-view>
    <div class="menuBar">
      <ul>
        <li>
          <router-link to="/msite" >
              <span class="icon-home"></span>
              <span>外賣</span>
          </router-link>
        </li>
        <li>
          <router-link to="/discover">
              <span class="icon-compass2"></span>
              <span>搜索</span>
          </router-link>
        </li>
        <li>
          <router-link to="/order">
              <span class="icon-file-text2"></span>
              <span>訂單</span>
          </router-link>
        </li>
        <li>
          <router-link to="/profile">
              <span class="icon-user"></span>
              <span>我的</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less" >
.menuBar{
  position:fixed;
  bottom:0;
  left:0;
  width:100%;
  height:45px;
  border-top:1px solid #666;
  background-color: #fff;
  ul{
    width:100%;
    display: flex;
    padding-top:4.5px;
    li{
      display:inline;
      float:left;
      flex:1;
      text-align: center;
      height:34px;
      a{
        display:block;
        font-size:12px;
        color:#666;
        &.active{
          color:#0089dc;
        }
      }
      span{
        display:block;
      }
      [class^="icon-"]{
        font-size:20px;
      }
    }

  }
  
}


</style>
