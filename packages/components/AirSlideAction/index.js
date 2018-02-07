/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2018/02/07.
 */
import SlideAction from './src/SlideAction.vue'
const VueTouch = require('vue-touch')

SlideAction.install = function (Vue) {
  Vue.use(VueTouch)
  Vue.component(SlideAction.name, SlideAction)
}

export default SlideAction
