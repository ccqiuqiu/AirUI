/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2018/02/07.
 */
import AirSlideAction from './src/SlideAction.vue'
import AirSlideActionGroup from './src/SlideActionGroup.vue'
const VueTouch = require('vue-touch')

AirSlideAction.install = function (Vue) {
  Vue.use(VueTouch)
  Vue.component(AirSlideActionGroup.name, AirSlideActionGroup)
  Vue.component(AirSlideAction.name, AirSlideAction)
}

export default AirSlideAction
export {AirSlideActionGroup, AirSlideAction}
