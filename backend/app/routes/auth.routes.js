import express from 'express'
import { login, logout, register } from '../controllers/auth.controllers.js'

const router = express.Router()

router.route('/sign-up').post(register)
router.route('/sign-in').post(login)
router.route('/sign-out').post(logout)

export default router
