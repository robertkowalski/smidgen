'use strict'

const log = require('npmlog')
const pkg = require('../package.json')

function handleError (err) {
  if (!err) {
    process.exit(1)
  }

  if (/COMMAND attachToTangle/.test(err.message)) {
    err = new Error([
      'Could not attach to Tangle.',
      'To attach to the Tangle you need to connect to a full node.',
      'Use --provider to switch node.'
    ].join('\n'))
    err.type = 'EUSAGE'
  }

  if (err.type === 'EUSAGE') {
    if (Array.isArray(err.message.split('\n'))) {
      err.message.split('\n').forEach(el => log.error(el))
    } else if (err.message) {
      log.error(err.message)
    }
    process.exit(1)
  }

  err.message && log.error(err.message)

  if (err.stack) {
    log.error('', err.stack)
    log.error('', '')
    log.error('', '')
    log.error('', 'smidgen:', pkg.version, 'node:', process.version)
    log.error('', 'please open an issue including this log on ' + pkg.bugs.url)
  }
  process.exit(1)
}

module.exports = handleError
