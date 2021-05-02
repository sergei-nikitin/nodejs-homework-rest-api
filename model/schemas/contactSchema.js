const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
  },
})
// contactSchema.path('name').validate((value) => {
//     const re = /[A-Z]\w+/
//     return re.test(String(value))
// })

const Contact = model('contact', contactSchema)

module.exports = Contact