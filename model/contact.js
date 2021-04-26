const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')

function errHandle(err) {
  console.log(err.message)
}

const { v4: uuidv4 } = require('uuid')

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    errHandle(err)
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const findContact = contacts.find(({ id }) => id.toString() == contactId.toString())
    return findContact
  } catch (err) {
    errHandle(err)
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const newContactsList = contacts.filter(({ id }) => Number(id) !== Number(contactId))
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
    console.log(`Contact with id: ${contactId} deleted`)
  } catch (err) {
    errHandle(err)
  }
}

async function addContact(body) {
  try {
    const id = uuidv4()
    const contacts = await listContacts()
    const newContact = {
      id,
      ...body,
    }
    const newContactsList = [...contacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
    return newContact
  } catch (err) {
    errHandle(err)
  }
}

async function updateContact(contactId, body) {
  try {
    const contacts = await listContacts()
    const normalizedId = contactId.toString()
    const contactToUpdate = await getContactById(normalizedId)
    const updateContact = Object.assign(contactToUpdate, body)
    console.log(updateContact)
    const updateContactsList = contacts.map((contact) => {
      return contact.id == normalizedId ? updateContact : contact
    })
    await fs.writeFile(contactsPath, JSON.stringify(updateContactsList, null, '\t'))
    return updateContact
  } catch (err) {
    errHandle(err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
