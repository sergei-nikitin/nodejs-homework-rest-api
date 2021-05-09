const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')
const guard = require('../../halpers/guard')

router.post('/register', ctrl.reg)
router.post('/login', ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.post('/current', guard, ctrl.getCurrent)

module.exports = router
