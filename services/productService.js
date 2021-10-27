const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100
    for(let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000)
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id)
    if(!product) {
      throw boom.notFound("product not found")
    }

    if(product.isBlock) {
      throw boom.conflict("product is block")
    }
    return product
  }

  async update(id, body) {
    if(!id || !body) {
      return boom.badData("insufficient parameters")
    }
    const existDoc = this.products.find(item => item.id === id)
    if(!existDoc) {
      throw boom.notFound("product not found");
    }
    const indexElement = this.products.findIndex(item => item.id === id)
    let newAll = [...this.products]
    const product = newAll[indexElement]
    if(product.isBlock) {
      throw boom.conflict("product is block")
    }
    newAll[indexElement] = {
      ...product,
      ...body
    }
    this.products = newAll
    return this.products[indexElement]
  }

  async delete(id) {
    const indexElement = this.products.findIndex(item => item.id === id)
    if(indexElement === -1) {
      return boom.notFound("product not found")
    }
    this.products.splice(indexElement, 1)
    return { id }
  }
}

module.exports = ProductsService
