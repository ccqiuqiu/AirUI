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
      activeArr: [],
      mValue: this.value
    }
  },
  watch: {
    value(val) {
      this.mValue = val
    },
    mValue(val) {
      this.init(val)
      // this.children.forEach(c => c.toggle(0))
      // this.children[val] && this.children[val].toggle()
      // this.$emit('input', val)
    },
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
    this.init(this.value)
  },
  methods: {
    init(val) {
      if (!this.expand) {
        this.children.forEach(c => c.toggle(0))
        this.children[val] && this.children[val].toggle()
      } else {
        this.children.forEach((c, i) => {
          if (val.includes(i)) {
            if (!c.isActive) {
              c.toggle()
            }
          } else {
            c.toggle(0)
          }
        })
        val.forEach(v => {
          if (!this.children[v].isActive) {
            this.children[v].toggle()
          }
        })
      }
      this.$emit('input', val)
      // this.activeArr = new Array(this.children.length).fill(false)
      // if (this.value !== undefined) {
      //   if (typeof this.value === 'number') {
      //     if (this.value >= 0) {
      //       this.activeArr[this.value] = true
      //       this.children[this.value].toggle()
      //     }
      //   } else {
      //     this.value.forEach(i => {
      //       this.activeArr[i] = true
      //       this.children[i].toggle()
      //     })
      //   }
      // }
    },
    getChildren () {
      return this.$children.filter(c => {
        return c.$options && c.$options.name === 'AirAccordionContent'
      })
    },
    panelClick (uid, isActive) {
      this.changeActive(uid, isActive)
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
    },
    changeActive(uid, isActive) {
      const index = this.children.findIndex(c => c._uid === uid)
      if (!this.expand) {
        this.mValue = isActive ? index : -1
        // this.activeArr = new Array(this.children.length).fill(false)
      } else {
        const index2 = this.mValue.indexOf(index)
        if (index2 >= 0) {
          this.mValue.splice(index2, 1)
        } else {
          this.mValue.push(index)
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
