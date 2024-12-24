require('dotenv').config();
const { transports, createLogger,format  } = require("winston");
const { ElasticsearchTransport } = require('winston-elasticsearch');
const { Client } = require('@elastic/elasticsearch');

// Configure Elasticsearch client
const esClient = new Client({
  node: process.env.ELASTIC_SEARCH_HOST, // Update with your Elasticsearch URL
});

// Configure Elasticsearch transport
const esTransportOpts = {
  level: 'info', // Log level
  client: esClient,
  indexPrefix: 'node-logs', // Elasticsearch index prefix
};

const esTransport = new ElasticsearchTransport(esTransportOpts);


esTransport.on('error', (err) => {
  console.error('Error in Elasticsearch Transport:', err);
});


const logger = createLogger(
  {
  level: 'info',
  format: format.json(),
  // transports: [elasticsearchTransport],
  transports: [
    new transports.Console(), // Console logging
    esTransport,                     // Elasticsearch logging
  ],
  }
)


module.exports = logger