<template>
	<span :class="classType"></span>
</template>
<script type="text/ecmascript-6">
export default {
props: {
  iconType: {
    type: Number
  },
  iconSize: {
    type: Number
  }
},
created() {
  this.classMap = [
  ['icon decrease', 'icon discount', 'icon special', 'icon invoice', 'icon guarantee'],
  ['icon2 decrease', 'icon2 discount', 'icon2 special', 'icon2 invoice', 'icon2 guarantee']
  ]
},
computed: {
  classType: function () {
    if (this.iconSize === 24){
      return this.classMap[0][this.iconType]
    } else if (this.iconSize === 32){
      return this.classMap[1][this.iconType]
    }
  }
}
}

</script>
<style lang="less">
  @import "../../common/less/base";
.icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    &.decrease{
      .bg-image('./img/decrease_1');
    }
    &.discount{
      .bg-image('./img/discount_1');
    }
    &.guarantee{
      .bg-image('./img/guarantee_1');
    }
    &.invoice{
      .bg-image('./img/invoice_1');
    }
    &.special{
      .bg-image('./img/special_1');
    }
  }
.icon2{
    display: inline-block;
    vertical-align: top;
    width: 16px;
    height: 16px;
    margin-right: 4px;
    background-repeat: no-repeat;
    background-size: 16px 16px;
    &.decrease{
      .bg-image('./img/decrease_2');
    }
    &.discount{
      .bg-image('./img/discount_2');
    }
    &.guarantee{
      .bg-image('./img/guarantee_2');
    }
    &.invoice{
      .bg-image('./img/invoice_2');
    }
    &.special{
      .bg-image('./img/special_2');
    }
  }
</style>
