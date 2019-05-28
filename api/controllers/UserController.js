'use strict'

const userModel = require('../models/User')
const validator = require('validator')
const crypto = require('crypto')

const debug = require('debug')('api:controller:user')
debug.log = console.log.bind(console)

const _ = require('lodash')

class UserController {
  static store(req, res) {

    let errors = []

    let body = req.body
    //TODO move validation to model
    if (validator.isEmpty(body.email)) {
      errors.push({
        'message': 'validation.required',
        'code': 'email'
      })
    } else if (!validator.isEmail(body.email)) {
      errors.push({
        'message': 'validation.bad_email',
        'code': 'email'
      })
    }

    if (validator.isEmpty(body.password)) {
      errors.push({
        'message': 'validation.required',
        'code': 'password'
      })
    } else if (!validator.isLength(body.password, {
      min: 6, max: 32
    })) {
      errors.push({
        'message': 'validation.password_length',
        'code': 'password'
      })
    }

    if (validator.isEmpty(body.password_confirm)
      || !validator.equals(body.password, body.password_confirm)) {
      errors.push({
        'message': 'validation.confirm_password',
        'code': 'password_confirm'
      })
    }

    let userExists = userModel.byEmail(body.email)
    Promise.all([userExists]).then((u) => {

      if (u[0] != null) {
        errors.push({
          'message': 'validation.email_taken',
          'code': 'email'
        })
      }

    }).then(() => {
      if (errors.length > 0) {
        return res.status(422).json(errors)
      } else {

        const salt = crypto.randomBytes(16).toString('hex')
        const password = crypto
          .pbkdf2Sync(body.password, salt, 1000, 64, 'sha512').toString('hex')

        userModel.forge({
          'email': body.email,
          'password': password,
          'salt': salt,
          'role_id': 2,
          'status': 'novice'
        }).save().then(() => {
          return res.json({ 'status': 'ok' })
        }).catch((err) => {
          console.error(err)
          return res.status(500).json({ 'message': 'error.unknown' })
        })
      }
    })
  }

  static list(req, res) {
    const UserCollection = require('../collections/UserCollection')

    new UserCollection().fetch({
      withRelated: [{'role':q => {
        q.columns('name', 'id')
    }}],
      columns: ['id', 'email', 'created_at', 'updated_at', 'role_id']
    }).then((users) => {
      return res.json(users)
    }).catch((err) => {
      debug(err)
      return res.status(500).end()
    })
  }
}

module.exports = UserController
