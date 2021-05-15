const { User, users } = require('./data')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

const findById = jest.fn((id) => {
  const user = users[0]
  return user
})


const updateAvatar = jest.fn((id, avatar) => {
  const user = findById(id)
  user.avatar = avatar
  return user
})

module.exports = {
  findById,
  updateAvatar,
}