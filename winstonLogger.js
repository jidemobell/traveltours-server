const { transports, createLogger,format  } = require("winston");
const { ElasticsearchTransport } = require('winston-elasticsearch');
const { axios } = require("axios");
const { Client } = require('@elastic/elasticsearch');


// const elasticSearchTransport = new transports.Stream({
//   stream: {
//     write: (info) => {
//       console.log('Data inserted into Elasticsearch:', info);
//       axios.post('http://34.57.149.149:9200', { message });
//     }
//   }
// })

// Configure Elasticsearch client
const esClient = new Client({
  node: 'http://34.57.149.149:9200', // Update with your Elasticsearch URL
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