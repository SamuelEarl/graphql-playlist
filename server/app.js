require('dotenv').config()
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow cross-origin requests.
app.use(cors());

// Connect to mLab database.
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.once('open', () => {
  console.log("Connected to mLab database on port", mongoose.connections[0].port);
});

// This is explained in lesson 6
app.use('/graphql', graphqlHTTP({
  schema,
  // Setting "graphiql: true" will tell the server to display the GraphiQL query tool when you visit the GraphQL endpoint that is specified as the first argument in this middleware function (i.e. '/graphql').
  graphiql: true
}));

app.listen(4000, function() {
  console.log("Express is listening for requests on port", this.address().port);
});
