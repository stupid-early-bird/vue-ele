<template>
  <div id="app">
  	<transition name="routerfade" mode="out-in">
  		<keep-alive>
    		<router-view></router-view>
  		</keep-alive>
  	</transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less" >
.routerfade-enter-active,.routerfade-leave-active{
	transition:all .3s;
}
.routerfade-enter,.routerfade-leave-active{
	opacity: 0;
}
</style>
