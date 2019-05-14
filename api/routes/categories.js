const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController')

const acl = require('../middleware/acl')('admin')
const empty_body = require('../middleware/empty_body')

router.post('/', [acl, empty_body, (req, res) => {
  return CategoryController.store(req, res)
}])

module.exports = router


