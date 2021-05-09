const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  createContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
} = require('./valid-contact-router')
const guard = require('../../halpers/guard')

router
  .get('/', guard, ctrl.getAllContacts)
  .post('/', guard, createContactValidation, ctrl.createContact)

router
  .get('/:contactId', guard, ctrl.getContactById)
  .delete('/:contactId', guard, ctrl.deleteContact)
  .patch('/:contactId', guard, updateContactValidation, ctrl.updateContact)

router.patch('/:contactId/favorite', guard, updateContactStatusValidation, ctrl.updateContactStatus)

module.exports = router
