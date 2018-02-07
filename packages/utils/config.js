/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2018/2/1.
 */
function config (options) {
  options && merge(config, options)
}

merge(config, {
  mouseWheel: false
})

function merge (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i]
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}


export default config
