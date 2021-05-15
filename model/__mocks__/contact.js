const { contacts } = require('./data')

const listContacts = jest.fn((userId, query) => {
  const { limit = 20, offset = 0 } = query
  return { contacts, total: contacts.length, limit, offset }
})

const getContactById = jest.fn((userId, id) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(id))
  return contact
})

const removeContact = jest.fn((userId, id) => {
  const index = contacts.findIndex((el) => String(el._id) === String(id))
  if (index === -1) {
    return null
  }
  const [contact] = contacts.splice(index, 1)
  return contact
})

const addContact = jest.fn((userId, body) => {
  cats.push({ ...body, _id: '5f8382425ba83a4f1829ca5d' })
  return { ...body, _id: '5f8382425ba83a4f1829ca5d' }
})

const updateContact = jest.fn((userId, id, body) => {
  let [contact] = contacts.filter((el) => String(el._id) === String(id))
  if (contact) {
    contact = { ...contact, ...body }
  }
  return contact
})

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}