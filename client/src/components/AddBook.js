import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_AUTHORS_QUERY, ADD_BOOK_MUTATION, GET_BOOKS_QUERY } from '@/graphql/api';

const AddBook = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
  const [addBookMutation, addBookStatus] = useMutation(ADD_BOOK_MUTATION);
  let listOfAuthors;

  if (loading) {
    listOfAuthors = (<option disabled>Loading authors...</option>);
  }
  else {
    listOfAuthors = data.authors.map(author => {
      return(
        <option key={author.id} value={author.id}>{ author.name }</option>
      );
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId
      },
      refetchQueries: [
        {
          query: GET_BOOKS_QUERY
        }
      ]
    });
    // Reset the input fields back to their original values.
    setName('');
    setGenre('');
    setAuthorId('');
  }

  return (
    <form id="add-book" onSubmit={handleSubmit}>

      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option>Select author</option>
          {listOfAuthors}
        </select>
      </div>

      <button>+</button>

    </form>
  );
}

export default AddBook;
