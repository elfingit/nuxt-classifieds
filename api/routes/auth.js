const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController')
const empty_body = require('../middleware/empty_body')

router.post('/', [ empty_body, (req, res) => {
  return AuthController.login(req, res)
}])

router.get('/role', (req, res) => {
  return AuthController.role(req, res)
})

module.exports = router
