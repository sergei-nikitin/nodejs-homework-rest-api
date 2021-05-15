const User = require('./schemas/userSchema')

const findById = async (id) => {
  return await User.findOne({ _id: id })
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const create = async (userOptions) => {
  const user = new User(userOptions)
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar })
}

const getCurrentUserToken = async (id) => {
  const user = await findById(id)
   return user.token
}

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatar,
  getCurrentUserToken,
}