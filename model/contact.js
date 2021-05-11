// const { optional } = require('joi')
const Contacts = require('./schemas/contactSchema')

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter, 
    isFavorite = null, 
    limit = 20,
    offset = 0,
  } = query
  const optionsSearch = { owner: userId }
  if (isFavorite !== null) {
    optionsSearch.isFavirite = isFavorite
  }
  const results = await Contacts.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
       ...(sortBy ? { [`${sortBy}`]: 1 } : {}), 
       ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'email subscription -_id'
    },
  })
  return results
}

const getContactById = async (userId, id) => {
  const result = await Contacts.findOne({ _id: id, owner: userId })
  return result
}

const removeContact = async (userId, id) => {
  const result = await Contacts.findByIdAndRemove({ _id: id, owner: userId })
  return result
}

const addContact = async (userId, body) => {
  const result = await Contacts.create({ ...body, owner: userId })
  return result
}

const updateContact = async (userId, contactId, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  )
  return result
}

const updateStatusContact = async (userId, contactId, body) => {
  if(Object.keys(body).length !== 0) {
    const result = await Contacts.findByIdAndUpdate(
      { _id: contactId, owner: userId },
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
