
const { verify_token, gen_token } = require('./token')
const userModel = require('../models/User')

const debug = require('debug')('api:user_access')
debug.log = console.log.bind(console)

class NoAuthCookie extends Error {}
class BadAuthToken extends Error {}
class UserNotFound extends Error {}
class UnknownUserRole extends Error {}

const UserAccess = (req) => {
  return async () => {

    if (!req.signedCookies || !req.signedCookies.token) {
      throw new NoAuthCookie()
    }

    const currentToken = verify_token(req.signedCookies.token)

    if (!currentToken) {
      throw new BadAuthToken()
    }

    const user = await userModel.byId(currentToken.id)

    if (!user) {
      throw new UserNotFound()
    }

    let relation = user.relations

    if (!relation || !relation.role) {
      throw new UnknownUserRole()
    }

    let role = relation.role

    const tokenPayload = {
      'id': user.get('id')
    }

    let token = gen_token(tokenPayload)

    return  {
      'success': true,
      'token': token,
      'role': role.get('name').toLowerCase()
    }


    /*const promise = new Promise((resolve, reject) => {


      userModel.byId(currentToken.id)
        .then((u) => {

          if (u == null) {
            return reject(new UserNotFound())
          }

          u.role().fetch().then((r) => {

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

    })

    Promise.all([promise]).then((data) => {
      return payload
    }).catch((err) => {
      debug(err)
      return null
    })*/
  }
}

module.exports = { UserAccess, NoAuthCookie, BadAuthToken, UserNotFound, UnknownUserRole }
