import { Link } from "react-router-dom";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import StockLabel from "../../components/StockLabel/StockLabel";

export default function BookCard({ book }) {
  return (
    <div className="uk-card uk-card-default uk-grid-item-match">
      <div className="uk-card-media-top">
        <Link to={`/books/${book.id}`}>
          <img src={book.image_url} width="300" alt={book.title} />
        </Link>
      </div>
      <div className="uk-card-body">
        <p>${book.price}</p>
        <AddToCartButton book={book} />
        <p>
          <StockLabel book={book} />
        </p>
      </div>
    </div>
  );
}
