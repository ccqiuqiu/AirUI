/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2017/12/15.
 */
import AirIndexSelect from './components/AirIndexSelect'
import AirIndexList from './components/AirIndexList'
import AirLineMap from './components/AirLineMap'
import {AirAccordion, AirAccordionContent} from './components/AirAccordion'
import AirCalenderH from './components/AirCalenderH'
import AirCalenderV from './components/AirCalenderV'
import AirScroll from './components/common/Scroll'

const components = [
  AirIndexSelect,
  AirIndexList,
  AirLineMap,
  AirAccordion,
  AirAccordionContent,
  AirCalenderH,
  AirCalenderV,
  AirScroll
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
