const Joi = require('joi');
const schema = Joi.object({
    username: Joi.string().min(3).max(30),
	pagesize: Joi.number().integer().min(10).max(100)
})
const {error, value } = schema.validate({username: 'zsss', pagesize:'12'})
console.log(error)