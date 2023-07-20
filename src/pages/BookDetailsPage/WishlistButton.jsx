import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import sendRequest from "../../utilities/send-request";
import { useState } from "react";
import { bookAtom } from "./bookContext";

export default function WishlistButton() {
  const user = useAtomValue(userAtom);
  const book = useAtomValue(bookAtom);
  const [wishlistMsg, setWishlistMsg] = useState("");

  async function addToWishlist() {
    if (user === null) {
      setWishlistMsg("Join as a T-WB member to add to your wishlist.");
    }

    try {
      const response = await sendRequest("/api/wishlists", "POST", {
        bookId: parseInt(book.id),
        userId: parseInt(user.id),
      });
      const jsonData = await response.json();
      setWishlistMsg(jsonData);
    } catch (error) {
      setWishlistMsg(error.message);
    }
  }

  return (
    <button
      className="uk-icon-button uk-button-danger"
      uk-icon="heart"
      onClick={addToWishlist}
    />
  );
}
