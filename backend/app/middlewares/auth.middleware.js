import { UserModel } from '../models/user.model.js'
import { Jwt } from '../services/jwt.services.js'

export const isAuthenticated = async (request, response, next) => {
  const errorResponse = {
    success: false,
    code: 'UnAuthorized',
    statusCode: 403,
    message: '',
    meta: {
      timestamp: new Date().toISOString(),
      domain: 'localhost',
    },
  }

  try {
    const token = request.cookies?.token
    if (!token) {
      errorResponse.message = 'Missing token inside request'
      return response.status(403).json({ error: errorResponse })
    }

    // if token then validate
    const decoded = await Jwt.verifyToken(token)
    // check if user exists
    const user = await UserModel.findById(decoded.payload)
    if (!user) {
      errorResponse.message = 'Invalid token found'
      return response.status(403).json({ error: errorResponse })
    }
    request.userId = user._id
    next()
  } catch (err) {
    return next(err)
  }
}
