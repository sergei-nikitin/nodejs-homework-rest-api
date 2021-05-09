const Users = require('../model/users')
const { HttpCode } = require('../halpers/constants')
const jwt = require('jsonwebtoken')
// const { Logger } = require('mongodb')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const reg = async (req, res, next) => {
  const { email } = req.body
  const user = await Users.findByEmail(email)
  console.log(user)
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already use',
    })
  }
  try {
    const newUser = await Users.create(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
      },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await Users.findByEmail(email)
  const isValidPassword = await user?.validPassword(password)
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Invalid credentials',
    })
  }
  const payload = { id: user.id }
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
  await Users.updateToken(user.id, token)
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { token },
  })
}

const logout = async (req, res, next) => {
  const id = req.user.id
  await Users.updateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

const getCurrent = async (req, res, next) => {
  console.log(req.user);
  const { email, subscription } = req.user
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { email, subscription },
  });
}

// const getCurrent = async (req, res, next) => {
//   const id = req.user.id
//   const token = await Users.getCurrentUserToken(id)
//   if(token === null) {
//     return res.status(HttpCode.UNAUTHORIZED).json({
//       status: '401 Unauthorized',
//       code: HttpCode.UNAUTHORIZED,
//       ResponseBody: {
//          "message": "Not authorized"
// },
//     })
//   }
//   return res.status(HttpCode.OK).json({
//     status: '200 OK',
//     code: HttpCode.OK,
//     ResponseBody: {
//       "email": "example@example.com",
//       "subscription": "starter"
//     }
//   })
// }







module.exports = {
  reg,
  login,
  logout,
  getCurrent,
}