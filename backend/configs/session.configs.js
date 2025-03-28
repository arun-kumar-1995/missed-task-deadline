import { redisClient } from './redis.configs'

export const configSession = {
  name: 'session_management',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,

  // defing store
  // bind redis client for communication
  store: new RedisStore({ client: redisClient, prefix: 'app:session' }),
}
