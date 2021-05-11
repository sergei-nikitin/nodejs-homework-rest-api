const Contacts = require('../model/contact')

const getAllContacts = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contacts = await Contacts.listContacts(userId, req.query)
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
      const userId = req.user?.id
      const contact = await Contacts.getContactById(userId, req.params.contactId)
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
      const userId = req.user?.id
      const contact = await Contacts.addContact(userId, req.body)
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
      const userId = req.user?.id
      const contact = req.params.contactId
      if (contact) {
        await Contacts.removeContact(userId, req.params.contactId)
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
      const userId = req.user?.id
      const contact = await Contacts.updateContact(userId, req.params.contactId, req.body)
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
      const userId = req.user?.id
      const contact = await Contacts.updateStatusContact(userId, req.params.contactId, req.body)
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