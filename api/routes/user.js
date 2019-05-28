const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController')

const empty_body = require('../middleware/empty_body')

const acl = require('../middleware/acl')('admin')

router.post('/', [empty_body, (req, res) => {
  return UserController.store(req, res)
}])

router.get('/', [acl, (req, res) => {
  return UserController.list(req, res)
}])

module.exports = router
