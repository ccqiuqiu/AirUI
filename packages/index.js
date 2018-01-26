/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2017/12/15.
 */
import AirIndexSelect from './components/AirIndexSelect'
import AirLineMap from './components/AirLineMap'
import {AirAccordion, AirAccordionContent} from './components/AirAccordion'
import AirCalenderH from './components/AirCalenderH'
import AirCalenderV from './components/AirCalenderV'

const components = [
  AirIndexSelect,
  AirLineMap,
  AirAccordion,
  AirAccordionContent,
  AirCalenderH,
  AirCalenderV
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
