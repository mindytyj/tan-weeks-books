import { Link } from "react-router-dom";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import StockLabel from "../../components/StockLabel/StockLabel";

export default function BookCard({ book }) {
  return (
    <div className="uk-card uk-card-default">
      <div className="uk-card-media-top">
        <Link to={`/books/${book.id}`}>
          <img src="" width="300" height="300" alt="" />
        </Link>
      </div>
      <div className="uk-card-body">
        <p>${book.price}</p>
        <AddToCartButton book={book} />
        <StockLabel book={book} />
      </div>
    </div>
  );
}
