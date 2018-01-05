/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2017/12/15.
 */
import AirIndexSelect from './components/AirIndexSelect'
import AirLineMap from './components/AirLineMap'
import AirInput from './components/AirInput'

const components = [
  AirIndexSelect,
  AirLineMap,
  AirInput
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
