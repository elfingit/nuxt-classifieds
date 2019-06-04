const express = require('express');
const router = express.Router();

const UserRoleController = require('../controllers/UserRoleController')

const acl = require('../middleware/acl')('admin')

router.get('/', [acl, (req, res) => {
  return UserRoleController.list(req, res)
}])

module.exports = router
