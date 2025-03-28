'use strict'

/**
 * Import required modules
 *
 */
import { CatchAsyncError } from '../helpers/catchAsyncError.helpers.js'
import { validate } from '../helpers/validate.helpers.js'
import { APIResponse } from '../shared/apiResponse.shared.js'
import { UserService } from '../services/user.services.js'
import { HttpStatus } from '../constants/httpStatus.constants.js'
import { SendToken } from '../shared/sendToken.shared.js'

/**
 *  Define handler
 *
 *  register handler
 */

export const register = CatchAsyncError(async (request, response, next) => {
  const { name, email, password, role } = request.body
  // validate income request
  validate(request.body, { email, name, password, role })

  // UserService
  const user = await UserService.register(request.body)

  return APIResponse(response, HttpStatus.SUCCESS, 'User registered', { user })
})

/**
 *  Login handler
 */
export const login = CatchAsyncError(async (request, response, next) => {
  const { email, password } = request.body
  // validate income request
  validate(request.body, { email, password })

  const data = await UserService.login(request.body)

  SendToken(response, data, 'You are logged in ')
})

/**
 *  Logout handler
 */
export const logout = CatchAsyncError(async (request, response, next) => {})
