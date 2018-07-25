const fs = require('fs')
const path = require('path')
const pathExists = require('path-exists')

module.exports.resolvePreloadModules = (fp = '') => {
  fp = path.resolve(fp)
  let { root } = path.parse(fp)
  let result = []

  let module = path.resolve(fp, '__init__.js')
  if (pathExists.sync(module)) {
    result.unshift(module)
  }

  do {
    fp = path.dirname(fp)
    let module = path.resolve(fp, '__init__.js')
    if (pathExists.sync(module)) {
      result.unshift(module)
    }
  } while (fp !== root)

  return result
}
