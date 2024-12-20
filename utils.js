const redis = require('redis');

const redisPassword = process.env.REDIS_PASSWORD;
const redisHost = 'redis-19735.c1.us-central1-2.gce.redns.redis-cloud.com';
const redisPort = 19735;

const redisClient = redis.createClient({
  url: `redis://:${redisPassword}@${redisHost}:${redisPort}`
});




const redisConnect = async () => {
  try{
    await redisClient.connect();
    return redisClient
  }catch(err){
    console.error('Error connecting to Redis Cloud:', err);
  }
}

module.exports = redisConnect