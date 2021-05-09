const Contacts = require('../model/contact')

const getAllContacts = async (req, res, next) => {
    try {
      const contacts = await Contacts.listContacts()
      return res.json({
        status: 'succes',
        code: 200,
        data: {
          contacts,
        }
      })
    } catch (e) {
      next(e)
    }
  }
  
const getContactById = async (req, res, next) => {
    try {
      const contact = await Contacts.getContactById(req.params.contactId)
      if (contact) {
        return res.json({
          status: 'succes',
          code: 200,
          data: {
            contact,
          }
        })
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not Found',
        })
      }
    } catch (e) {
      next(e)
    }
  }
  
const createContact = async (req, res, next) => {
    try {
      const contact = await Contacts.addContact(req.body)
      return res.status(201).json({
        status: 'succes',
        code: 201,
        data: {
          contact,
        }
      })
    } catch (e) {
      next(e)
    }
  }
  
const deleteContact = async (req, res, next) => {
    try {
      const contact = req.params.contactId
      if (contact) {
        await Contacts.removeContact(req.params.contactId)
        return res.json({
          status: 'succes',
          code: 200,
          data: {
            contact,
          }
        })
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not Found',
        })
      }
    } catch (e) {
      next(e)
    }
  }
  
const updateContact = async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res.json({
          status: 'succes',
          code: 200,
          data: {
            contact,
          }
        })
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'not Found',
        })
      }
    } catch (e) {
      next(e)
    }
  }
  
const updateContactStatus = async (req, res, next) => {
    try {
      const contact = await Contacts.updateStatusContact(req.params.contactId, req.body)
      if (contact) {
        return res.json({
          status: 'succes',
          code: 200,
          data: {
            contact,
          }
        })
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not Found',
        })
      }
    } catch (e) {
      next(e)
    }
  }

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
    updateContactStatus,
}  