import redis from 'redis'

// create redis instance
export const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

// connect to redis client
await redisClient.connect()

redisClient.on('error', (err) => {
  console.log('Redis error: ', err)
})
