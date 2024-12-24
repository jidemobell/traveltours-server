const pino = require('pino');
const ecsFormat = require('@elastic/ecs-pino-format');
const pinoElastic = require('pino-elasticsearch');

let streamToElastic;

try {
  streamToElastic = pinoElastic({
    index: 'logs-nodejs',
    consistency: 'one',
    node: 'http://34.57.149.149:9200', // Update this with your Elasticsearch endpoint
    'esVersion': 7,
    'flushBytes': 1000,
    // 'flushInterval': 5000,
  });

  // console.log(streamToElastic)

  streamToElastic.on('ready', () => {
    console.log('Elasticsearch stream is ready.');
  });
  
  streamToElastic.on('error', (err) => {
    console.error('Error with Elasticsearch stream:', err);
  });
  
  streamToElastic.on('insert', (data) => {
    console.log('Data inserted into Elasticsearch:', data);
  });
  
  streamToElastic.on('close', () => {
    console.log('Elasticsearch stream closed.');
  });
  
  streamToElastic.on('drain', () => {
    console.log('Stream drained.');
  });
  
} catch (error) {
  console.error('Failed to initialize Elasticsearch stream:', err);
  streamToElastic = null; // Fallback to console logging
}

process.on('exit', () => {
  if (streamToElastic && typeof streamToElastic.end === 'function') {
    streamToElastic.end();
    console.log('Elasticsearch stream closed.');
  }
});


const logger = pino(
  {
    ...ecsFormat(),
    level: process.env.LOG_LEVEL || 'info',
  },
  streamToElastic || process.stdout
);


logger.info('Logger initialized successfully');



// const streamToElastic = pinoElastic({
//   index: 'logs-nodejs',
//   consistency: 'one',
//   node: 'http://34.57.149.149:9200', // Update this with your Elasticsearch endpoint
//   'esVersion': 7,
//   'flushBytes': 200
// });

// const logger = pino({ 
//   // ...ecsFormat(),
//   level: process.env.LOG_LEVEL || 'info',
//  },
//  streamToElastic
// );

module.exports = logger;
