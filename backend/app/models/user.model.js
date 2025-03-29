import { User } from '../schemas/user.schema.js'
import { Model } from '../helpers/model.helpers.js'

export class UserModel extends Model {
  constructor() {
    super(User)
  }
}
