const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController')

const empty_body = require('../middleware/empty_body')

router.post('/', [empty_body, (req, res) => {
    return UserController.store(req, res)
}])

module.exports = router
