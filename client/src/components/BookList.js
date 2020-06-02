import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOKS_QUERY } from '@/api/api';
import BookDetails from '@/components/BookDetails';

function BookList() {
  const [selected, setSelected] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
  let listOfBooks;

  if (loading) {
    listOfBooks = (<div>Loading books...</div>);
  }
  else {
    listOfBooks = data.books.map(book => {
      return(
        <li
          key={book.id}
          onClick={(e) => setSelected(book.id)}
        >
          { book.name }
        </li>
      );
    });
  }

  return (
    <div>
      <ul id="book-list">
        {listOfBooks}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
