import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import sendRequest from "../../utilities/send-request";

export default function RemoveWishlistItem({ book, setWishlist, wishlist }) {
  const user = useAtomValue(userAtom);

  async function removeFromWishlist() {
    if (user.id === null || user.id === undefined) {
      return;
    }

    try {
      await sendRequest(`/api/wishlists/${user.id}/${book.id}`, "DELETE");
      setWishlist(
        wishlist.filter((wishlistItem) => wishlistItem.id !== book.id)
      );
    } catch {
      console.log("Failed to delete book from wishlist.");
    }
  }

  return (
    <button
      className="uk-button uk-button-danger uk-button-small uk-text-center"
      type="button"
      onClick={removeFromWishlist}
    >
      X
    </button>
  );
}
