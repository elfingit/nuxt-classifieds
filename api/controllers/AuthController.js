'use strict'

const userModel = require('../models/User')
const validator = require('validator')
const crypto = require('crypto')

const COOKIE_AGE = 1000 * 60 * 60

class AuthController {

  static login(req, res) {

    const { gen_token } = require('../lib/token')

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
            'id': u.get('id')
          }

          let token = gen_token(user)

          res.cookie('token', token, {
            maxAge: COOKIE_AGE,
            httpOnly: true,
            signed: true
          })

          return res.json({ 'success': true, 'token': token })
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

  static role(req, res) {

    try {

      const { UserAccess } = require('../lib/UserAccess')

      UserAccess(req)()
        .then((payload) => {
          return res.cookie('token', payload.token, {
            maxAge: COOKIE_AGE,
            httpOnly: true,
            signed: true
          }).json(payload)
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

module.exports = AuthController
