const assert = require('assert')
const { resolvePreloadModules } = require('./')

assert.deepStrictEqual(resolvePreloadModules('./fixture/a/index.js'), [
  __dirname + '/fixture/__init__.js',
  __dirname + '/fixture/a/__init__.js'
])

assert.deepStrictEqual(resolvePreloadModules('./fixture/b/c'), [
  __dirname + '/fixture/__init__.js',
  __dirname + '/fixture/b/c/__init__.js'
])
