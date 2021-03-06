#!/usr/bin/env node

const meow = require('meow')
const path = require('path')
const execa = require('execa')
const { red, green, dim } = require('chalk')
const { resolvePreloadModules } = require('../')

const cli = meow(
  `
  Usage
    $ ${green('pyno')} <filename>

  Options
    --verbose       Print populated command
    --timeout, -t   Timeout to terminate long-running process. Default is 3000 ms
    --register, -r  Name of preload module. Default is __init__.js

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
`,
  {
    flags: {
      verbose: {
        type: 'boolean',
        default: false
      },
      timeout: {
        alias: 't',
        type: 'string',
        default: '3000'
      },
      register: {
        alias: 'r',
        type: 'string',
        default: '__init__.js'
      }
    }
  }
)

if (cli.input.length === 0) {
  console.error('Specify a filename')
  process.exit(1)
}

let filename = path.resolve(cli.input[0] || '')
let modules = resolvePreloadModules(filename, cli.flags.register)

if (cli.flags.verbose) {
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
}

let args = modules.reduce((acc, x) => acc.concat('-r', x), []).concat(filename)
execa('node', args, {
  timeout: cli.flags.timeout,
  stdio: 'inherit'
}).catch(reason => {
  reason.timedOut && console.log(red('Timed out!'))
})
