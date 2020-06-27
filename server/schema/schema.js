const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = graphql;

// // Dummy data
// const books = [
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//   { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//   { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// const authors = [
//   { name: 'Patrick Rothfuss', age: 44, id: '1' },
//   { name: 'Brandon Sanderson', age: 42, id: '2' },
//   { name: 'Terry Pratchett', age: 66, id: '3' },
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // This is a type relation - how you relate one type with another type. See tutorial #13.
    author: {
      type: AuthorType, // By specifying `type: AuthorType`, I think this means that this field is going return some data (an object in this case) that follows the data structure that is specified in the `AuthorType` type definition, but the resolver describes how the data are retrieved.
      resolve(parent, args) {
        // Resolve function code for dummy data:
        // return _.find(authors, { id: parent.authorId });

        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    // This is how you create a type relation with a list. See tutorial #14.
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // Resolve function code for dummy data:
        // return _.filter(books, { authorId: parent.id });

        return Book.find({ authorId: parent.id });
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // Resolve function code for dummy data:
        // return books;

        return Book.find({});
      }
    },
    book: {
      type: BookType, // By specifying `type: BookType`, I think this means that this field is going return some data (an object in this case) that follows the data structure that is specified in the `BookType` type definition, but the resolver describes how the data are retrieved.
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // Resolve function code for dummy data:
        // code to get data from db or other data source
        // return _.find(books, { id: args.id });

        return Book.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // Resolve function code for dummy data:
        // return authors;

        return Author.find({});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // Resolve function code for dummy data:
        // return _.find(authors, { id: args.id });

        return Author.findById(args.id);
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType, // By specifying `type: AuthorType`, I think this means that this field is going create some data (an object in this case) that follows the data structure that is specified in the `AuthorType` type definition, but the resolver describes how the data are created.
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
