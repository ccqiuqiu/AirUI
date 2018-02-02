/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2017/12/15.
 */
import config from './utils/config'
import AirIndexSelect from './components/AirIndexSelect'
import AirIndexList from './components/AirIndexList'
import AirLineMap from './components/AirLineMap'
import {AirAccordion, AirAccordionContent} from './components/AirAccordion'
import AirCalendarH from './components/AirCalendarH'
import AirCalendarV from './components/AirCalendarV'
import AirScroll from './components/AirScroll'
import AirDataBlock from './components/AirDataBlock'

const components = [
  AirIndexSelect,
  AirIndexList,
  AirLineMap,
  AirAccordion,
  AirAccordionContent,
  AirCalendarH,
  AirCalendarV,
  AirScroll,
  AirDataBlock
]

const install = function (Vue, options) {
  if (install.installed) return
  config(options)
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
