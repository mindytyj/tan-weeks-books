import { useAtomValue } from "jotai";
import WishlistButton from "./WishlistButton";
import { bookAtom } from "./bookContext";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import StockLabel from "../../components/StockLabel/StockLabel";
import { adminAtom } from "../../utilities/adminContext";
import { userAtom } from "../../utilities/userContext";
import DeleteBookButton from "./DeleteBookButton";
import EditBookButton from "../EditBookPage/EditBookButton";

export default function MainBookDetails() {
  const book = useAtomValue(bookAtom);
  const user = useAtomValue(userAtom);
  const isAdmin = useAtomValue(adminAtom);

  return (
    <div className="uk-section uk-section-default uk-preserve-color">
      <div className="uk-container uk-margin-left uk-margin-right">
        <div
          className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin"
          data-uk-grid
        >
          <div className="uk-card-media-left uk-cover-container">
            <img src="images/light.jpg" alt="" data-uk-cover />
            <canvas width="600" height="400"></canvas>
          </div>
          <div>
            <div className="uk-card-body">
              <h3 className="uk-card-title">{book.title}</h3>
              <p>
                by {book.first_name} {book.last_name}
              </p>
              <p>${book.price}</p>
              {user && isAdmin ? (
                <>
                  <EditBookButton book={book} />
                  <DeleteBookButton book={book} />
                </>
              ) : (
                <>
                  <AddToCartButton book={book} />
                  <WishlistButton />
                </>
              )}
              <p>
                <StockLabel book={book} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
