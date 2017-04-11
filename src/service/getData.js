import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

const baseUrl = 'https://mainsite-restapi.ele.me'
// const imgBaseUrl = 'https://fuss10.elemecdn.com'

// 获取食品分类
var msiteFoodTypes = geohash => Vue.http.get(baseUrl + '/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
}).then(res => {
  console.log('aaa:' + res)
})

export {msiteFoodTypes}
