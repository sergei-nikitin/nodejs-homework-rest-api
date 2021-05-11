const Joi = require('joi')

const schemaCreateContact = Joi.object({
 name: Joi.string().min(3).max(30).required(),
 email: Joi.string()
    .email({ minDomainSegments: 2,
         tlds: { allow: ['com', 'net'] }
     })
     .required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
 })

 const schemaQueryContact = Joi.object({
    sortBy: Joi.string().valid('name', 'phone', 'id').optional(),
    sortByDesc: Joi.string().valid('name', 'phone', 'id').optional(),
    filter: Joi.string().optional(),
    limit: Joi.number().integer().min(1).max(20).optional(),
    offset: Joi.number().integer().min(0).max(20).optional(),
    isFavorite: Joi.boolean().optional(),
  }).without('sortBy', 'sortByDesc')


  
const schemaUpdataContact = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string()
       .email({ minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        })
        .optional(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).optional(),
   }).or('name', 'number', 'email')

const schemaUpdateContactStatus = Joi.object({
    favorite: Joi.boolean().required(),
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
    validationQueryContact: async (req, res, next) => { 
        return await validate(schemaQueryContact, req.qury, next)
  },
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