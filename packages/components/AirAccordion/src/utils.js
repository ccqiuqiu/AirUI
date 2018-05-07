/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2018/1/17.
 */
function createJavaScriptTransition (name, functions, css = true, mode = 'in-out') {
  return {
    name,

    functional: true,

    props: {
      css: {
        type: Boolean,
        default: css
      },
      mode: {
        type: String,
        default: mode
      }
    },

    render (h, context) {
      const data = {
        props: {
          ...context.props,
          name
        },
        on: functions
      }

      return h('transition', data, context.children)
    }
  }
}
function addOnceEventListener (el, event, cb) {
  var once = () => {
    cb()
    el.removeEventListener(event, once, false)
  }

  el.addEventListener(event, once, false)
}

function ExpandTransitionGenerator(expandedParentClass = '') {
  return {
    enter (el, done) {
      el._parent = el.parentNode

      addOnceEventListener(el, 'transitionend', done)

      // Get height that is to be scrolled
      el.style.overflow = 'hidden'
      el.style.height = 0
      el.style.display = 'block'
      expandedParentClass && el._parent.classList.add(expandedParentClass)

      setTimeout(() => (el.style.height = `${el.scrollHeight}px`), 100)
    },

    afterEnter (el) {
      el.style.overflow = null
      //el.style.height = null
    },

    leave (el, done) {
      // Remove initial transition
      addOnceEventListener(el, 'transitionend', done)

      // Set height before we transition to 0
      el.style.overflow = 'hidden'
      el.style.height = `${el.offsetHeight}px`

      setTimeout(() => (el.style.height = 0), 100)
    },

    afterLeave (el) {
      expandedParentClass && el._parent.classList.remove(expandedParentClass)
    }
  }
}

export const ExpandTransition = createJavaScriptTransition('expand-transition', ExpandTransitionGenerator())

