import { gql } from 'apollo-boost';

export const GET_BOOKS_QUERY = gql`
  query GetBooks {
    books {
      name
      id
    }
  }
`;

export const GET_BOOK_QUERY = gql`
  query GetBook($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const GET_AUTHORS_QUERY = gql`
  query GetAuthors {
    authors {
      name
      id
    }
  }
`;

export const ADD_BOOK_MUTATION = gql`
  # You can give your mutations a name, but that is not required. I have given this mutation the name "AddBook". Then inside the parentheses you specify the parameters that will be passed to this mutation along with their data type. Each parameter is named with a "$" followed by the name of the parameter. Then you can reference those parameters in the mutation that will be sent to the server (e.g. the "addBook()" portion of the mutation).
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
