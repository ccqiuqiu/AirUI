/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2017/11/15.
 */
import AirAccordion from './src/AirAccordion'
import AirAccordionContent from './src/AirAccordionContent'

AirAccordion.install = function (Vue) {
  Vue.component(AirAccordion.name, AirAccordion)
  Vue.component(AirAccordionContent.name, AirAccordionContent)
}

export default AirAccordion
export { AirAccordion, AirAccordionContent }
