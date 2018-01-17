/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2018/1/17.
 */
import { ExpandTransition } from './utils'

import mixins from './mixins'

// import VIcon from '../VIcon'

import ClickOutside from './click-outside'

export default {
  name: 'AirAccordionContent',

  mixins: [mixins.Bootable, mixins.Ripple, mixins.Toggle],

  components: {
    // VIcon
  },

  directives: {
    ClickOutside
  },

  inject: ['focusable', 'panelClick'],

  data () {
    return {
      height: 'auto'
    }
  },

  props: {
    hideActions: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false
    }
  },

  methods: {
    genBody () {
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
    genHeader () {
      return this.$createElement('div', {
        staticClass: 'air-accordion__header',
        directives: [{
          name: 'ripple',
          value: this.ripple
        }],
        on: {
          click: () => this.panelClick(this._uid)
        }
      }, [
        this.$slots.header,
        // this.genIcon()
      ])
    },
    genIcon (h) {
      if (this.hideActions) return null

      const icon = this.$slots.actions ||
        this.$createElement('v-icon', 'keyboard_arrow_down')

      return this.$createElement('div', {
        staticClass: 'header__icon'
      }, [icon])
    },
    toggle (uid) {
      console.log(uid)
      const isActive = this._uid === uid && !this.isActive

      if (isActive) this.isBooted = true

      // We treat bootable differently
      // Needs time to calc height
      this.$nextTick(() => (this.isActive = isActive))
    }
  },

  render (h) {
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
          // Ensure element is focusable and the activeElement
          if (this.focusable &&
            this.$el === document.activeElement &&
            e.keyCode === 13
          ) this.panelClick(this._uid)
        }
      }
    }, children)
  }
}
