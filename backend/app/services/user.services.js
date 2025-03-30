'use strict'

/**
 *  import required modules here
 */

import { HttpStatus } from '../constants/httpStatus.constants.js'
import { UserModel } from '../models/user.model.js'
import { APIError } from '../shared/errorHandler.shared.js'
import { Bcrypt } from './bcrypt.services.js'
import { Jwt } from './jwt.services.js'

// * User service methods

class Service {
  /**
   *
   */

  async register(body) {
    // check for duplicate
    const duplicate = await UserModel.findOne({ email: body.email })
    if (duplicate)
      throw new APIError(
        HttpStatus.CONFLICT,
        `This Email : ${body.email} is already registered`
      )

    // create new user
    const user = await UserModel.create(body)
    return user
  }

  async login(body) {
    // validate user credentials
    const user = await UserModel.findOne({ email: body.email }, '+password')
    if (!user) throw new APIError(HttpStatus.NOT_FOUND, 'Invalid Email entered')

    // match the password
    const match = await Bcrypt.comparePassword(body.password, user.password)
    if (!match)
      throw new APIError(
        HttpStatus.UNAUTHORIZED,
        'Invalid Email or Password entered'
      )

    // generate token
    const token = await Jwt.generateToken(user._id)
    return { token, userId: user._id }
  }
}

export const UserService = new Service()
