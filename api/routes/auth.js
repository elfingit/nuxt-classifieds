const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController')

router.post('/', (req, res) => {
  return AuthController.login(req, res)
})

router.get('/role', (req, res) => {
  return AuthController.role(req, res)
})

module.exports = router