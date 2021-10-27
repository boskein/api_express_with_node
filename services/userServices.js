const faker = require('faker');
const boom = require('@hapi/boom');


class UserService {
  constructor () {
    this.users = []
    this.generateUsers()
  }

  generateUsers() {
    const limit = 100
    for(let i=0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        lastName: faker.name.lastName(),
        image: faker.image.imageUrl()
      })
    }
  }

  async createUser(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users)
      }, 5000)
    })
  }

  async findOne(id) {
    const user = this.users.find(item => item.id == id)
    if(!user) {
      throw boom.notFound("user not found")
    }
    return user
  }

  async updateUser(id, body) {
    if(!id || !body) {
      throw boom.notFound("user not found")
    }
    const user = this.users.find(item => item.id === id)
    if(!user) {
      throw boom.notFound("user not found")
    }
    const indexUser = this.users.findIndex(item => item.id === id)
    const users = [...this.users]
    let prevDataUser = users[indexUser]
    const newDataUser =  {
      ...prevDataUser,
      ...body
    }
    users[indexUser] = newDataUser
    this.users = users
    return this.users[indexUser]
  }

  async deleteUser(id) {
    const indexUser = this.users.findIndex(item => item.id === id)
    if(indexUser === -1) {
      throw boom.notFound("not found user")
    }
    this.users.splice(indexUser, 1)
    return { id }
  }




}


module.exports = UserService
