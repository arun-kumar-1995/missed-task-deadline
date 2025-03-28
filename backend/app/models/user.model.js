import { User } from '../schemas/user.schema.js'

class UserModal {
  constructor(model) {
    this.model = model
  }

  async createUser(userData) {
    const user = new User(userData)
    return await user.save();
  }
  
}

export const UserModel = new UserModal(User);