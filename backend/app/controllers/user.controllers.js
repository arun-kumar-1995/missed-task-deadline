import { CatchAsyncError } from '../helpers/catchAsyncError.helpers.js'
import { UserModel } from '../models/user.model.js'
import { APIResponse } from '../shared/apiResponse.shared.js'

export const getUserProfile = CatchAsyncError(
  async (request, response, next) => {
    const user = await UserModel.findById(request.userId)
    return APIResponse(response, 'Here is user profile', {
      user,
      isAuthenticated: true,
    })
  }
)
export const getAllTasks = CatchAsyncError(
  async (request, response, next) => {}
)
