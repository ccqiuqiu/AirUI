/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2018/1/17.
 */
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
