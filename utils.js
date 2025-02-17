require('dotenv').config();
const { createClient } = require('redis');
// const logger = require('./winstonLogger');

const redisPassword = process.env.REDIS_PASSWORD;
const redisHost = 'redis-18561.c253.us-central1-1.gce.redns.redis-cloud.com';
const redisPort = 18561;

let client 
const getClient = async () => {
  try {

    if(!client){
      client = createClient({
        url: `redis://default:${redisPassword}@${redisHost}:${redisPort}`
      });
      await client.connect();
    }
    console.info('Connected to Redis')
    return client
    
  } catch (error) {
    console.error("error from redis:", error)
    throw error
  }
}



module.exports = getClient