const Contacts = require('./schemas/contactSchema')

const listContacts = async () => {
  const results = await Contacts.find()
  return results
}

const getContactById = async (id) => {
  const result = await Contacts.findOne({ _id: id })
  return result
}

const removeContact = async (id) => {
  const result = await Contacts.findByIdAndRemove({ _id: id })
  return result
}

const addContact = async (body) => {
  // const newContact = {
  //   ...body,
  // }
  // const collection = await getColection(db, 'contacts')
  // const {
  //   ops: [result],
  // } = await collection.insertOne(newContact)
  const result = await Contacts.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true },
  )
  return result
}

const updateStatusContact = async (contactId, body) => {
  if(Object.keys(body).length !== 0) {
    const result = await Contacts.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    )
    return result
  } else {
    return null
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
