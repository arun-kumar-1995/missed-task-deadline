import { HttpStatus } from '../constants/httpStatus.constants.js'
import { Jwt } from '../services/jwt.services.js'


export const isAuthenticated = async (request, response, next) => {
  try {
    const token = request.cookies?.token
    if (!token)
      throw new APIError(
        HttpStatus.UNAUTHORIZED,
        'Missing token inside request'
      )

    // if token then validate
    const decoded = await Jwt.verifyToken(token)

    // check if user exists
    const user = await UserModel.findById(decoded._id)
    if (!user) throw new APIError(HttpStatus.NOT_FOUND, 'Invalid token found')

    request.user = user._id
    next()
  } catch (err) {
    throw new APIError(HttpStatus.INTERNAL_SERVER_ERROR, err.message)
  }
}
