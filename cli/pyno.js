const meow = require('meow')
const path = require('path')
const { green, dim } = require('chalk')
const { spawn } = require('child_process')
const { resolvePreloadModules } = require('../')

const cli = meow(`
  Usage
    $ ${green('pyno')} <filename>

  Example
    $ ${green('echo')} $PWD
    /Users/dangh/oss

    $ ${green('ls')} $PWD
    __init__.js
    src/__init__.js
    src/test.js

    $ ${green('pyno')} src/test.js
    ${green('node')} ${dim('\\')}
      -r /Users/dangh/oss/__init__.js ${dim('\\')}
      -r /Users/dangh/oss/src/__init__.js ${dim('\\')}
      /Users/dangh/oss/src/test.js
`)

if (cli.input.length === 0) {
  console.error('Specify a filename')
  process.exit(1)
}

let filename = path.resolve(cli.input[0] || '')
let modules = resolvePreloadModules(filename)

if (modules.length) {
  console.log(
    green('node'),
    dim('\\'),
    ...modules.map(x => '\n  -r ' + x + dim(' \\')),
    '\n  ' + filename
  )
} else {
  console.log(green('node'), underline(filename))
}

let args = modules.reduce((acc, x) => acc.concat('-r', x), []).concat(filename)
let pyno = spawn('node', args, { windowsHide: true })
pyno.stdout.on('data', buf => console.log(buf.toString()))
pyno.stderr.on('data', buf => console.log(buf.toString()))
