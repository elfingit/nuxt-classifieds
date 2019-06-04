'use strict'

const roleModel = require('../models/UserRole')

const debug = require('debug')('api:controller:user')
debug.log = console.log.bind(console)

const _ = require('lodash')

class UserRoleController {
  static list(req, res) {
    const UserRoleCollection = require('../collections/UserRoleCollection')

    new UserRoleCollection().fetch()
      .then((roles) => {
        return res.json(roles)
      }).catch((err) => {
        debug(err)
        return res.status(500).end()
      })
  }
}

module.exports = UserRoleController
