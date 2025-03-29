/**
 *  Import required modules
 */

import jwt from 'jsonwebtoken'
import { redisClient } from '../../configs/redis.configs.js'

// * Define jwt methods
export const Jwt = {
  generateToken: async (payload) => {
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    // store the token inside redis for authentication
    // await redisClient.set('session:user', payload, 'EX', 3600);
    // await redisClient.setex(`session:${payload}`, 3600, JSON.stringify(user));
    return token
  },

  verifyToken: async function (token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  },
}
