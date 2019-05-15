
const acl = (role) => {
  return async (req, res, next) => {

    try {

      const { UserAccess } = require('../lib/UserAccess')

      UserAccess(req)()
        .then((payload) => {
          return next()
        })
        .catch((err) => {
          return res.status(403)
        })

    } catch (e) {
      console.error(e)
      return res.status(500)
    }

  }
}

module.exports = acl
