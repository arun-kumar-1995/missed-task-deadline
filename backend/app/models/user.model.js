import { User } from '../schemas/user.schema.js'

class UserModal {
  constructor(model) {
    this.model = model
  }

  async findOne(query, select) {
    return await this.model.findOne(query).select(select).lean()
  }

  async createUser(userData) {
    return await this.model.create(userData)
  }

  async getAllUsers() {
    return await this.model.find({})
  }

  // async getUserById(id) {
  //   return await this.model.findById(id);
  // }

  // async updateUser(id, userData) {
  //   return await this.model.findByIdAndUpdate(id, userData, { new: true });
  // }

  // async deleteUser(id) {
  //   return await this.model.findByIdAndDelete(id);
  // }
}

export const UserModel = new UserModal(User)
