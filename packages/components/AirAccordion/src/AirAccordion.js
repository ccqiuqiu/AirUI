/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2018/1/17.
 */
export default {
  name: 'AirAccordion',
  provide () {
    return {
      panelClick: this.panelClick,
      focusable: this.focusable
    }
  },
  props: {
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },
  methods: {
    getChildren () {
      return this.$children.filter(c => {
        return c.$options && c.$options.name === 'AirAccordionContent'
      })
    },
    panelClick (uid) {
      const children = this.getChildren()

      if (!this.expand) {
        for (let index = children.length; --index >= 0;) {
          children[index].toggle(uid)
        }
        return
      }

      for (let index = children.length; --index >= 0;) {
        if (children[index]._uid === uid) {
          children[index].toggle(uid)
          return
        }
      }
    }
  },
  render (h) {
    return h('ul', {
      staticClass: 'air-accordion',
      'class': {
        'air-accordion--focusable': this.focusable,
        'air-accordion--popout': this.popout,
        'air-accordion--inset': this.inset
      }
    }, this.$slots.default)
  }
}
