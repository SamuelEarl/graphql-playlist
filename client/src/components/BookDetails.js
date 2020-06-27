import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOK_QUERY } from '@/graphql/api';

function BookDetails(props) {
  const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
    variables: { id: props.bookId}
  });
  let selectedBook;

  console.log("DATA:", data);

  if (!data || !data.book) {
    selectedBook = (<p>No book selected...</p>);
  }
  else {
    const { book } = data;
    selectedBook = (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map(otherBook => {
            return <li key={otherBook.id}>{otherBook.name}</li>
          })}
        </ul>
      </div>
    );
  }

  return (
    <div id="book-details">
      {selectedBook}
    </div>
  );
}

export default BookDetails;
