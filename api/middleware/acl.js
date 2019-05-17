
const acl = (role) => {
  return (req, res, next) => {

    try {

      const { UserAccess } = require('../lib/UserAccess')

      UserAccess(req)()
        .then((payload) => {
          return next()
        })
        .catch((err) => {
          return res.status(403).end()
        })

    } catch (e) {
      console.error(e)
      return res.status(500).end()
    }

  }
}

module.exports = acl
