const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql2');

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'testuser',
  password: 'password',
  database: 'university',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    courses(limit: Int, sortOrder: String): [Course]
    course(id: Int!): Course
    coursesInCollection(id: String!): [Course]
    collections: [Collection]
    collection(id: String!): Collection
  }

  type Course {
    id: Int!
    title: String
    description: String
    duration: Int
    collection_id: String
    outcome: String
  }

  type Collection {
    id: Int!
    collection_id: String
    name: String
    courses: [Course]
  }
`);

// Define resolvers
const root = {
  // takes 2 optional parameters courses(limit, sortOrder)
  // if no parameters supplied returns list of all available courses
  courses: async ({ limit, sortOrder }) => {
    let sortIt = 'SELECT * FROM courses';
    if (sortIt != undefined) {
      const ascending = sortOrder == 'ASC' ? true : false;
      sortIt = ascending ? 'SELECT * FROM courses ORDER BY id ASC' : 'SELECT * FROM courses ORDER BY id DESC';
    }
    return new Promise((resolve, reject) => {
      const limitIt = limit != undefined ? ' limit ?' : '';
      db.query(sortIt + limitIt, [limit], (err, results) => {
        if (err) reject(err);
        resolve(results); // Return the matching courses
      });
    });
  },

  // return the course that matches the specified course id
  course: async ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM courses WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]); // Return the first matching course
      });
    });
  },

  // return the courses that match the specified collection id
  coursesInCollection: async ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM courses WHERE collection_id = ?', [id], (err, results) => {
        if (err) reject(err);
        resolve(results); // Return the matching courses
      });
    });
  },

  // return a list of collections
  collections: async () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM collections', (err, results) => {
        if (err) reject(err);
        resolve(results); // Return the collections
      });
    });
  },

  // return the collection by id and all courses that match the specific collection
  collection: async ({ id }) => {
    return new Promise((resolve, reject) => {
      console.log(id);
      db.query('SELECT * FROM collections WHERE collection_id = ?', [id], (err, results) => {
        if (err) reject(err);
        console.log(results);
        resolve(results); // Return the matching courses
      });
    });
  },
};

// Create the Express app and GraphQL endpoint
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL UI
  }),
);

app.listen(4000, () => console.log('Server running at http://localhost:4000/graphql'));
