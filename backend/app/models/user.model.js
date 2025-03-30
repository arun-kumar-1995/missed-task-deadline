import { User } from '../schemas/user.schema.js'
import { Model } from '../helpers/model.helpers.js'

class UserModal extends Model {
  constructor() {
    super(User)
  }
}

export const UserModel = new UserModal(User)
