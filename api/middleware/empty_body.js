const empty_body = (req, res, next) => {

  const debug = require('debug')('api:middleware:empty_body')
  debug.log = console.log.bind(console)

  let body = req.body

  if (Object.getOwnPropertyNames(body).length == 0) {
    debug('Empty body: ' + req.originalUrl)
    return res.status(400).end()
  }

  return next()

}

module.exports = empty_body
