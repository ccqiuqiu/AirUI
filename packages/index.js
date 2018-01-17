/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2017/12/15.
 */
import AirIndexSelect from './components/AirIndexSelect'
import AirLineMap from './components/AirLineMap'
import {AirAccordion, AirAccordionContent} from './components/AirAccordion'

const components = [
  AirIndexSelect,
  AirLineMap,
  AirAccordion,
  AirAccordionContent
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
