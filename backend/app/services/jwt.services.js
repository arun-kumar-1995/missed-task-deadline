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
    redisClient.set('session:user', payload, 'EX', 3600)
    return token
  },
}
