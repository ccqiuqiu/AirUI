/**
 * Created by 熊超超(https://github.com/ccqiuqiu) on 2018/2/1.
 */
function config (options) {
  merge(config, options)
}

merge(config, {
  mouseWheel: false
})

function merge (target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i]
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}


export default config
