const express = require('express');
const router = express.Router();
const faker = require('faker');
const UserService = require('../services/userServices')
const service = new UserService()
const { validatorHandler } = require('../middlewares/validatorHandler')
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/userSchema')

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find()
    res.json(users)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', validatorHandler(getUserSchema, 'params'),
  async (req, res, next) =>{
    try {
      const { id } = req.params;
      const message = await service.findOne(id)
      res.json(message)
    } catch (err) {
      next(err)
    }
})

router.post('/', validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await service.createUser(body)
      res.json({
        message: "created",
        data: newUser
      })
    } catch (err) {
      next(err)
    }
})

router.put('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const data = await service.updateUser(id, body)
      res.json({
        message: "update",
        data
      })
    } catch (err) {
      next(err)
    }
})

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const data = await service.updateUser(id, body)
      res.json({
        message: "update",
        data
      })
    } catch(err) {
      next(err)
    }
})

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const deleteUser = await service.deleteUser(id)
      res.json({
        message: "deleted",
        deleteUser
      })
    } catch (err) {
      next(err)
    }
})

module.exports = router
