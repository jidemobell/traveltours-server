const redis = require('redis');

const redisClient = redis.createClient({ url: 'redis://localhost:6379' });

const redisConnect = async () => {
  await redisClient.connect();
  return redisClient
}

module.exports = redisConnect