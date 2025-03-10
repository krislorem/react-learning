import React from "react";
import { useParams } from "react-router-dom";

const Book = () => {
  const { bookId } = useParams();
  return (
    <div>
      <h2>Book Page</h2>
      <h3>bookId:{bookId}</h3>
    </div>
  );
};

export default Book;
