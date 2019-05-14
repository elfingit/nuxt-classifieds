'use strict'

const userModel = require('../models/User')
const validator = require('validator')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

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

    new Promise((resolve, reject) => {
      const { verify_token, gen_token } = require('../lib/token')
      const payload = verify_token(req.signedCookies.token)

      if (payload) {
        userModel.byId(payload.id)
          .then((u) => {
            if (u == null) {
              return reject()
            }

            u.role().then((r) => {
              if (r == null) {
                return reject()
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
              return reject()
            })

          }).catch((e) => {
            return reject()
          })
      } else {
        return reject()
      }
    }).then((data) => {

      res.cookie('token', data.token, {
        maxAge: COOKIE_AGE,
        httpOnly: true,
        signed: true
      })

      return res.json(data)
    }).catch((err) => {
      return res.status(403).end()
    })

  }
}

module.exports = AuthController
