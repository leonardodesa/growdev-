import User from '../models/User'
import authConfig from '../config/auth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController {
  async store(req, res) {
    const { email } = req.body

    try {
      if (await User.findOne({ email }))
        return res.send({
          success: false,
          message: 'Usuário já existe!',
          statusCode: 500,
        })

      const user = await User.create(req.body)

      res.send({
        user,
        token: generateToken({ id: user.id }),
        message: 'usuário criado com sucesso',
        sucess: true,
        status: 200,
      })
    } catch (e) {
      res.send({
        success: false,
        message: 'Erro para registrar um novo usuário.',
        statusCode: e.code,
      })
    }
  }

  async authenticate(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user)
      return res.send({
        success: false,
        message: 'Usuário não encontrado',
        statusCode: 500,
      })

    if (!(await bcrypt.compare(password, user.password)))
      return res.send({
        success: false,
        message: 'Senha inválida',
        statusCode: 500,
      })

    user.password = undefined

    return res.send({
      user,
      token: generateToken({ id: user.id }),
      success: true,
      message: 'Usuario logado',
      statusCode: 200,
    })
  }
}

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 864000,
  })
}

export default new AuthController()
