const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('./shema');

const users = [
  {
    id: 1,
    name: 'khan',
    age: 25,
  },
];

const app = express();

app.use(cors());

const root = {
  getAllUsers: () => users,
  getUser: ({ id }) => users.find((user) => user.id === id),
  createUser: ({ input }) => {
    const newUser = { id: new Date(), ...input };
    users.push(newUser);
    return newUser;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  }),
);

app.listen(5000, () => console.log('App started on port 5000'));
