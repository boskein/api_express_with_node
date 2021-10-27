const express = require('express')
const router = express.Router()

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json(
    {
      categoryId,
      productId
    }
  )
})

router.get('/', (req, res) => {
  res.json([
    {
      categoryId: 1,

      category: "Food",
      products: []
    },
    {
      categoryId: 2,
      category: "Electronics",
      products: []
    },
    {
      categoryId: 3,
      category: "Clothes",
      products: []
    },
  ])
})

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params
  res.json({
    categoryId,
    category: "Food",
    products: []
  })
})

module.exports = router