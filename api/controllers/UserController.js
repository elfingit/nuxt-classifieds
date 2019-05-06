'use strict'

const userModel = require('../models/User')
const validator = require('validator')
const crypto = require('crypto')

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
    
    let userExists = userModel.byEmail(body.email)
    Promise.all([userExists]).then((u) => {
      
      if (u[0] != null) {
        errors.push({
          'message': 'Email already taken',
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
          return res.json({'status':'ok'})
        }).catch((err) => {
          console.dir(err)
          return res.status(500).json({'message':'Something went wrong'})
        })
  
        
      }
    })
  }
}

module.exports = UserController