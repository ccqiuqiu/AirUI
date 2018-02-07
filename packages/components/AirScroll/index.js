/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2017/11/15.
 */
import Scroll from './src/Scroll.vue'
import config from "../../utils/config"

Scroll.install = function (Vue, options) {
  config(options)
  Vue.component(Scroll.name, Scroll)
}

export default Scroll
