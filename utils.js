require('dotenv').config();
const { createClient } = require('redis');
// const logger = require('./winstonLogger');

// redis-13002.c74.us-east-1-4.ec2.redns.redis-cloud.com:13002
const redisPassword = process.env.REDIS_PASSWORD;
const redisHost = 'redis-13002.c74.us-east-1-4.ec2.redns.redis-cloud.com';
const redisPort = 13002;

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