
const { verify_token, gen_token } = require('./token')
const userModel = require('../models/User')

const debug = require('debug')('api:user_access')
debug.log = console.log.bind(console)

class NoAuthCookie extends Error {}
class BadAuthToken extends Error {}
class UserNotFound extends Error {}
class UnknownUserRole extends Error {}

class UserAccess {

  constructor(req) {
    this.req = req
  }

  acess() {

    let payload = null
    let self = this

    new Promise((resolve, reject) => {

      if (!self.req.signedCookies && !self.req.signedCookies.token) {
        return reject(new NoAuthCookie())
      }

      const payload = verify_token(req.signedCookies.token)

      if (!payload) {
        return  reject(new BadAuthToken())
      }

      userModel.byId(payload.id)
        .then((u) => {

          if (u == null) {
            return reject(new UserNotFound())
          }

          u.role().then((r) => {

            if (r == null) {
              return reject(new UnknownUserRole())
            }

            const user = {
              'id': u.get('id')
            }

            let token = gen_token(user)

            return resolve({
              'success': true,
              'token': token,
              'role': r.get('name').toLowerCase()
            })

          }).catch((err) => {
            return reject(err)
          })

        }).catch((err) => {
          return reject(err)
      })

    }).then((data) => {
      payload = data
    }).catch((err) => {
      debug(err)
    })

    return payload
  }

}

module.exports = UserAccess
