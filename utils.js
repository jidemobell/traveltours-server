require('dotenv').config();
const { createClient } = require('redis');
const logger = require('./logger');

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
    logger.info('Connected to Redis')
    return client
    
  } catch (error) {
    logger.error("error from redis:", error)
    throw error
  }
}



module.exports = getClient