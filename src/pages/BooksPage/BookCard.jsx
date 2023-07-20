import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookCard({ book }) {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    async function checkStock() {
      if (parseInt(book.qty) === 0) {
        setAvailable(false);
      }
    }
    checkStock();
  }, [book.qty]);

  return (
    <div className="uk-card uk-card-default">
      <div className="uk-card-media-top">
        <Link to={`/books/${book.id}`}>
          <img src="" width="300" height="300" alt="" />
        </Link>
      </div>
      <div className="uk-card-body">
        <p>${book.price}</p>
        <button
          className="uk-button uk-button-primary uk-align-center"
          disabled={!available}
        >
          Add to Cart
        </button>
        {available ? (
          <span className="uk-label uk-label-success">Available</span>
        ) : (
          <span className="uk-label uk-label-danger">Out of Stock</span>
        )}
      </div>
    </div>
  );
}
