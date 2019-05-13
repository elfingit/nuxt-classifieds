const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController')

const acl = require('../middleware/acl')

router.post('/', [acl, (req, res) => {
  return CategoryController.store(req, res)
}])

module.exports = router


