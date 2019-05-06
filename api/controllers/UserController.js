'use strict'

let userModel = require('../models/User')
let validator = require('validator')

class UserController {
  static store(req, res) {

    let errors = []

    let body = req.body

    if (validator.isEmpty(body.email)) {
      errors.push({
        'message': 'This is required field',
        'code': 'email'
      })
    } else if (!validator.isEmail(body.email)) {
      errors.push({
        'message': 'Email is not valid',
        'code': 'email'
      })
    }

    if (validator.isEmpty(body.password)) {
      errors.push({
        'message': 'This is required field',
        'code': 'password'
      })
    } else if (!validator.isLength(body.password, {
      min:6, max:32
    })) {
      errors.push({
        'message': 'Password must be minimum 6 symbols and not more than 32',
        'code': 'password'
      })
    }

    if (validator.isEmpty(body.password_confirm) 
      || !validator.equals(body.password, body.password_confirm)) {
      errors.push({
        'message': 'You are should confirm your password',
        'code': 'password_confirm'
      })
    }

    if (errors.length > 0) {
      return res.status(422).json(errors)
    } else {



      return res.json({'status':'ok'})
    }
  }
}

module.exports = UserController