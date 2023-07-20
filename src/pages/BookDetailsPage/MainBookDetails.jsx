import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import sendRequest from "../../utilities/send-request";
import { useState } from "react";

export default function MainBookDetails({ book }) {
  const user = useAtomValue(userAtom);
  const [wishlistMsg, setWishlistMsg] = useState("");

  async function addToWishlist() {
    if (user === null) {
      setWishlistMsg("Join as a T-WB member to add to your wishlist.");
    }

    try {
      await sendRequest("/api/wishlists", "POST", {
        bookId: parseInt(book.id),
        userId: parseInt(user.id),
      });
      setWishlistMsg("Book has been added to your wishlist.");
    } catch {
      setWishlistMsg("Failed to add book to your wishlist.");
    }
  }

  return (
    <div className="uk-section uk-section-secondary uk-preserve-color">
      <div className="uk-container uk-margin-left uk-margin-right">
        <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-grid">
          <div class="uk-card-media-left uk-cover-container">
            <img src="images/light.jpg" alt="" uk-cover />
            <canvas width="600" height="400"></canvas>
          </div>
          <div>
            <div class="uk-card-body">
              <h3 class="uk-card-title">{book.title}</h3>
              <p>
                by {book.first_name} {book.last_name}
              </p>
              <p>${book.price}</p>
              <button className="uk-button uk-button-primary uk-margin-right">
                Add to Cart
              </button>
              <button
                className="uk-icon-button uk-button-danger"
                uk-icon="heart"
                onClick={addToWishlist}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
