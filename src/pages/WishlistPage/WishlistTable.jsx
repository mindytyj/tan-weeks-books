import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import WishlistItem from "./WishlistItem";

export default function WishlistTable() {
  const user = useAtomValue(userAtom);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function getWishlist() {
      try {
        const allWishlistItems = await sendRequest(
          `/api/wishlists/${user.id}`,
          "GET"
        );
        setWishlist(allWishlistItems);
      } catch {
        console.error("Unable to retrieve wishlist.");
      }
    }
    getWishlist();
  }, []);

  return wishlist.length > 0 ? (
    <table className="uk-table uk-table-justify">
      <thead>
        <tr>
          <th className="uk-table-shrink"></th>
          <th className="uk-table-expand">Title</th>
          <th className="uk-table-small"></th>
        </tr>
      </thead>
      <tbody>
        {wishlist.map((book) => {
          return (
            <WishlistItem
              book={book}
              setWishlist={setWishlist}
              wishlist={wishlist}
            />
          );
        })}
      </tbody>
    </table>
  ) : (
    <h3 className="uk-text-center">No Wishlist Items.</h3>
  );
}
