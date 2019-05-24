const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController')

const acl = require('../middleware/acl')('admin')
const empty_body = require('../middleware/empty_body')

router.post('/', [acl, empty_body, (req, res) => {
  return CategoryController.store(req, res)
}])

router.get('/', [acl, (req, res) => {
  return CategoryController.list(req, res)
}])

router.delete('/:id', [acl, (req, res) => {
  return CategoryController.del(req, res)
}])

console.dir(router.stack)

module.exports = router


