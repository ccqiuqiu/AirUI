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
    value: [Number, Array],
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },
  data() {
    return {
      children: [],
      activeArr: []
    }
  },
  watch: {
    activeArr() {
      const indexArr = []
      this.activeArr.forEach((v, i) => { v && indexArr.push(i) })
      if (!this.expand) {
        this.$emit('input', indexArr[0])
      } else {
        this.$emit('input', indexArr)
      }
    }
  },
  mounted() {
    this.children = this.$children.filter(c => {
      return c.$options && c.$options.name === 'AirAccordionContent'
    })
    this.activeArr = new Array(this.children.length).fill(false)
    if (this.value) {
      if (typeof this.value === 'number') {
        this.activeArr[this.value] = true
      } else {
        this.value.forEach(i => this.activeArr[i] = true)
      }
    }
    if (this.value !== undefined) {
      if (typeof this.value === 'number') {
        this.children[this.value].toggle()
      } else {
        this.value.forEach(i => this.children[i].toggle())
      }
    }
  },
  methods: {
    getChildren () {
      return this.$children.filter(c => {
        return c.$options && c.$options.name === 'AirAccordionContent'
      })
    },
    panelClick (uid, isActive) {
      this.changeActive(uid, isActive)
      const children = this.children

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
    },
    changeActive(uid, isActive) {
      const index = this.children.findIndex(c => c._uid === uid)
      if (!this.expand) {
        this.activeArr = new Array(this.children.length).fill(false)
      }
      this.activeArr.splice(index, 1, isActive)
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
