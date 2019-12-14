import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

class auth {
  async index(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader)
      return res.json({
        success: false,
        message: 'Sem token informado',
        statusCode: 401,
      })

    const parts = authHeader.split(' ')
    if (!parts.length === 2)
      return res.json({
        success: false,
        message: 'Token error',
        statusCode: 401,
      })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme))
      return res.json({
        success: false,
        message: 'Token fora do formato',
        statusCode: 401,
      })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err)
        return res.json({
          success: false,
          message: 'Token inválido',
          statusCode: 401,
        })
      req.userId = decoded.id
    })

    return next()
  }
}

export default new auth()
