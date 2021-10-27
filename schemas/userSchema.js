const Joi = require('joi')

const id = Joi.string().uuid()
const firstName = Joi.string().min(2)
const lastName = Joi.string().min(2)
const image = Joi.string().uri()


const createUserSchema = Joi.object({
  id: id,
  firstName: firstName.required(),
  lastName: lastName.required(),
  image: image.required()
})

const updateUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  image: image
})

const getUserSchema = Joi.object({
  id: id.required()
})


module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema
}
