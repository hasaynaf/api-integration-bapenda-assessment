/**
 * Module dependencies.
 */
const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.get('/output', controller.test.output)

module.exports = router
