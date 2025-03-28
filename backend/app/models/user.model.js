import { User } from "../schemas/user.schema.js";

export const UserModel = {

    createUser : async (userData) => {
        const user = new User(userData);
        return await user.save();
    }
}
