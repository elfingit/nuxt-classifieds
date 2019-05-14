
const acl = (role) => {
  return (req, res, next) => {

    const { verify_token } = require('../lib/token')
    const userModel = require('../models/User')

    new Promise((resolve, reject) => {

      if (!req.signedCookies || !req.signedCookies.token) {
        return reject(new Error('Not token in cookies'))
      }

      const payload = verify_token(req.signedCookies.token)

      if (!payload) {
        return reject(new Error('Payload is empty'))
      }

      userModel.byId(payload.id).then((u) => {
        u.role().then((r) => {
          if (r.get('name').toLowerCase() === role) {
            return resolve()
          } else {
            return reject(new Error('Bad user role'))
          }
        }).catch((e) => {
          return reject(e)
        })
      }).catch((e) => {
        return reject(e)
      })
    }).then(() => {
      return next()
    }).catch((e) => {
      console.error(e)
      return res.status(403).end()
    })

  }
}

module.exports = acl
