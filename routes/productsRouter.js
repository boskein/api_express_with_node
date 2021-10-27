const express = require('express');
const ProductsService = require('../services/productService');
const router = express.Router();
const service = new ProductsService();
const {validatorHandler} = require('./../middlewares/validatorHandler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/productSchema');

router.get('/', async (req, res) => {
  const products = await service.find()
  res.status(200).json(products)
})


router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await service.findOne(id)
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body
  const newProduct = await service.create(body)
  if(!newProduct) {
    res.status(501).json({
      message: "Internal Server"
    })
  } else {
    res.status(201).json({
      message: 'created',
      data: newProduct
    })
  }
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try{
    const { id } = req.params
    const body = req.body
    const data = await service.update(id, body)
    res.json({
      message: 'update',
      data,
    })
  } catch(err) {
    next(err)
  }

})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body
  const data = await service.update(id, body)
  if(!data) {
    res.status(500).json({
      message: 'Internal Error',
    })
  } else {
    res.json({
      message: 'update',
      data,
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deleteProduct = await service.delete(id)
  if(!deleteProduct) {
    res.status(500).json({
      message: 'Internal Error',
    })
  } else {
    res.json({
      message: 'deleted',
      deleteProduct
    })
  }
})

module.exports = router
