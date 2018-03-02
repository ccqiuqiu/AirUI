/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2018/1/17.
 */
import {ExpandTransition} from './utils'
import mixins from './mixins'
export default {
  name: 'AirAccordionContent',
  mixins: [mixins.Bootable, mixins.Toggle],
  inject: ['focusable', 'panelClick'],
  data() {
    return {
      height: 'auto'
    }
  },
  props: {},
  methods: {
    genBody() {
      return this.$createElement('div', {
        ref: 'body',
        class: 'air-accordion__body',
        directives: [
          {
            name: 'show',
            value: this.isActive
          }
        ]
      }, this.showLazyContent(this.$slots.default))
    },
    genHeader() {
      return this.$createElement('div', {
        staticClass: 'air-accordion__header',
        on: {
          click: () => this.panelClick(this._uid, !this.isActive)
        }
      }, [
        this.$slots.header,
        this.genIcon()
      ])
    },
    genIcon(h) {
      return this.$slots.icon ? this.$createElement('div', {
        staticClass: 'arrow-icon'
      }, [this.$slots.icon]) : null
    },
    toggle(uid = this._uid) {
      const isActive = this._uid === uid && !this.isActive
      if (isActive) {
        this.isBooted = true
      }
      this.$nextTick(() => (this.isActive = isActive))
    }
  },
  render(h) {
    const children = []
    this.$slots.header && children.push(this.genHeader())
    children.push(h(ExpandTransition, [this.genBody()]))
    return h('li', {
      staticClass: 'air-accordion__container',
      'class': {
        'air-accordion__container--active': this.isActive
      },
      attrs: {
        tabindex: 0
      },
      on: {
        keydown: e => {
          // 确保元素是可聚焦的活动的元素
          if (this.focusable &&
            this.$el === document.activeElement &&
            e.keyCode === 13
          ) this.panelClick(this._uid)
        }
      }
    }, children)
  }
}
