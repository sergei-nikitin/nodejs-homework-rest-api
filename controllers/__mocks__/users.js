const Users = require('../../model/__mocks__/data')
const fs = require('fs/promises')
const path = require('path')
const { HttpCode } = require('../halpers/constants')
const jwt = require('jsonwebtoken')
const jimp = require('jimp')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


// const findById = jest.fn((id) => {
//     const user = users[0]
//     return user
//   })


const updateAvatar = jest.fn((req, res, next) => {
    const { id } = req.user
    const avatarUrl = await saveAvatarUser(req)
    await Users.updateAvatar(id, avatarUrl)
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } })
})

module.exports = {
    updateAvatar,
  }