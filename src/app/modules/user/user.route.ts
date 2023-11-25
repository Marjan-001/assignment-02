import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

//create user
router.post('/users', userController.createUser)

export const UserRoutes = router
