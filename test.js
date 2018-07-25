const assert = require('assert')
const path = require('path')
const { resolvePreloadModules } = require('./')

assert.deepStrictEqual(resolvePreloadModules('./fixture/a/index.js'), [
  path.resolve('./fixture/__init__.js'),
  path.resolve('./fixture/a/__init__.js')
])

assert.deepStrictEqual(resolvePreloadModules('./fixture/b/c'), [
  path.resolve('./fixture/__init__.js'),
  path.resolve('./fixture/b/c/__init__.js')
])

assert.deepStrictEqual(resolvePreloadModules('./fixture/b/c/d'), [
  path.resolve('./fixture/__init__.js'),
  path.resolve('./fixture/b/c/__init__.js')
])
