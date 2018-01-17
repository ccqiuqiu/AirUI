/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2018/1/17.
 */
import Ripple from './ripple'
export default {
  Bootable: {
    name: 'bootable',

    data: () => ({
      isBooted: false
    }),

    props: {
      lazy: Boolean
    },

    watch: {
      isActive () {
        this.isBooted = true
      }
    },

    methods: {
      showLazyContent (content) {
        return (this.isBooted || !this.lazy)
          ? content
          : null
      }
    }
  },
  Ripple: {
    name: 'rippleable',

    directives: { Ripple },

    props: {
      ripple: {
        type: [Boolean, Object],
        default: true
      }
    },

    methods: {
      genRipple (data = { directives: [] }) {
        data.class = this.rippleClasses || 'input-group--selection-controls__ripple'
        data.directives.push({
          name: 'ripple',
          value: this.ripple && !this.disabled && { center: true }
        })
        data.on = Object.assign({
          click: this.toggle
        }, this.$listeners)

        return this.$createElement('div', data)
      }
    }
  },
  Toggle: {
    name: 'toggleable',

    model: { prop: 'value', event: 'input' },

    props: {
      value: { required: false }
    },

    data () {
      return {
        isActive: !!this.value
      }
    },

    watch: {
      value (val) {
        this.isActive = !!val
      },
      isActive (val) {
        !!val !== this.value && this.$emit('input', val)
      }
    }
  }
}
