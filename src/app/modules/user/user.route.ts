import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

//create user
router.post('/users', userController.createUser)
router.get('/users', userController.getAllUser)
router.get('/users/:userId', userController.getSingleUser)
router.put('/users/:userId', userController.updateSingleUser)
router.delete('/users/:userId', userController.deleteSingleUser)

export const UserRoutes = router
