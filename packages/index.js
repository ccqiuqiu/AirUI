import AirIndexSelect from './components/AirIndexSelect'
import AirLineMap from './components/AirLineMap'

const components = [
  AirIndexSelect,
  AirLineMap
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
