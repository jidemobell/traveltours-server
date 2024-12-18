const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const knex = require('knex')(require('./knexfile').development);
const redis = require('redis');

//intialize redis
const redisClient = redis.createClient({ url: 'redis://localhost:6379' });
await redisClient.connect();

// const { v4: uuidv4 } = require('uuid');


const schema = buildSchema(`
  type Query {
    AllUsers: [User]
    getUser(email: String, password: String): User
    AllPackages: [Package]
    getPackage(id: String): Package
  }

  type Mutation {
    createUser(email: String!, password: String!, google_id: String): User
    createUserWithEmail(email: String!): User
    addPackage(id: String): Package
  }

  type User {
    uuid: String
    password: String
    google_id: String
    name: String
    email: String
    created_at: String
    updated_at: String
  }

  type Package {
    id: String
    name: String
    description: String
    created_at: String
    updated_at: String
    links: String
}
`);



const root = {
  AllUsers: async () => {
    return await knex('users').select('*');
  },
  AllPackages: async () => {
    // console.log(knex('packages').select('*').toSQL())
    let result = null
    const cacheKey = 'allPackages';
    const cachedPackages = await redisClient.get(cacheKey)

    if(cachedPackages){
      return JSON.parse(cachedPackages)
    }

    result = await knex('packages').select('*');

    await redisClient.set(cacheKey, JSON.stringify(result), {
      EX: 604800 // 1 week
    });

    return result
  },
  getUser: async (value) => {
    const { email, password } = value
    // console.log('getting user', email)
    // console.log(knex('users').where('email',  email).select('*').toSQL())
    // console.log(uuid.toString())
    const response =  await knex('users').where({"email":  email, "password": password }).select('*');
    return response[0]
  },
  getPackage: async (value) => {
    const { id } = value
    console.log(knex('packages').where('uuid',  id).select('*').toSQL())
    const response =  await knex('packages').where('id',  id).select('*');
    return response[0]
  },
  createUser: async (user) => {
     const { email, password, google_id } = user
     const response = await knex('users').insert({ email , password, google_id });
     console.log(response)
     const { rowCount } = response;
     return rowCount
  },
  createUserWithEmail: async (user) => {
    // console.log(user)
    const { email } = user
    const response = await knex('users').insert({ email  });
    const { rowCount } = response;
    return rowCount
 }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('GraphQL server running on ibm cloud'));
