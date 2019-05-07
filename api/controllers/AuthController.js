'use strict'

const userModel = require('../models/User')
const validator = require('validator')
const crypto = require('crypto')

class AuthController {
  static login(req, res) {
    
    let errors = []

    if (validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
      errors.push({
        code: 'email',
        message: 'validation.bad_email'
      })
    }

    if (errors.length > 0) {
      return res.status(422).json(errors)
    }

    let userExists = userModel.byEmail(req.body.email)
    .then((u) => {
      if (u == null) {
        return res.status(401).json({
          'message': 'auth.bad_creds'
        })
      }

      let hex = crypto.pbkdf2Sync(req.body.password, u.get('salt'), 1000, 64, `sha512`).toString(`hex`)

      if (hex === u.get('password')) {
        const user = {
          'email': u.get('email'),
          'id': u.get('id')
        }

        req.session.authUser = user
        return res.json({'success': true, 'user': user })
      } else {
        return res.status(401).json({
          'message': 'auth.bad_creds'
        })
      }

    }).catch((e) => {
      console.error(e)
      return res.status(500).json({
        'message': 'error.unknown'
      })
    })

  }
}

module.exports = AuthController