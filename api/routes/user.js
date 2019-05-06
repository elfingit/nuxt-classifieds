const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController')

router.post('/', (req, res) => {
    return UserController.store(req, res)
})

module.exports = router