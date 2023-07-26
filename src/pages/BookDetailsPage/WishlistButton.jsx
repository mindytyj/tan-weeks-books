import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import sendRequest from "../../utilities/send-request";
import { bookAtom } from "./bookContext";
import { useState } from "react";

export default function WishlistButton() {
  const user = useAtomValue(userAtom);
  const book = useAtomValue(bookAtom);
  const [wishlistMsg, setWishlistMsg] = useState("");

  async function addToWishlist() {
    if (user === null) {
      return;
    }

    try {
      await sendRequest("/api/wishlists", "POST", {
        bookId: parseInt(book.id),
        userId: parseInt(user.id),
      });
      setWishlistMsg("Book has been successfully added to your wishlist!");
    } catch (error) {
      console.error(error.message);
      setWishlistMsg("The book is already in your wishlist.");
    }
  }

  return (
    <>
      <button
        className="uk-icon-button uk-button-danger uk-margin-left "
        uk-icon="heart"
        onClick={addToWishlist}
        data-uk-toggle="target: #wishlistModal"
      />
      <div id="wishlistModal" className="uk-flex-top" data-uk-modal>
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button
            className="uk-modal-close-default"
            type="button"
            data-uk-close
          />
          {user ? (
            <p className="uk-text-center">{wishlistMsg}</p>
          ) : (
            <p className="uk-text-center">
              Join as a T-WB member to add to wishlist.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
