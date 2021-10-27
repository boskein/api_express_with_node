const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property] //dinámico
    const {error} = schema.validate(data, { abortEarly: false})
    if(error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = {validatorHandler}

// req.body
// req.params
// req.query
