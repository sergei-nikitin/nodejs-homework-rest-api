const Joi = require('joi')

const schemaCreateContact = Joi.object({
 name: Joi.string().min(3).max(30).required(),
 email: Joi.string()
    .email({ minDomainSegments: 2,
         tlds: { allow: ['com', 'net'] }
     })
     .required(),
    number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
 })

const schemaUpdataContact = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string()
       .email({ minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        })
        .optional(),
        number: Joi.string().length(10).pattern(/^[0-9]+$/).optional(),
   }).or('name', 'number', 'email')

const schemaUpdateContactStatus = Joi.object({
    favorite: Joi.boolean().required,
})   

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        return next()
    } catch (err) {
       next({
           status: 400,
           message: err.message
       })
    }
}

module.exports = { 
    createContactValidation: async (req, res, next) => { 
      return await validate(schemaCreateContact, req.body, next)
},
    updateContactValidation: async (req, res, next) => {
      return await validate(schemaUpdataContact, req.body, next)
},
    updateContactStatusValidation: async (req, res, next) => {
        return await validate(schemaUpdateContactStatus, req.body, next)
    }
}