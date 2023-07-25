import AuthPage from "../AuthPage/AuthPage";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LoginPage from "../LoginPage/LoginPage";
import { userAtom } from "../../utilities/userContext";
import { useAtomValue, useSetAtom } from "jotai";
import BooksPage from "../BooksPage/BooksPage";
import BooksDetailPage from "../BookDetailsPage/BookDetailsPage";
import CartPage from "../CartPage/CartPage";
import WishlistPage from "../WishlistPage/WishlistPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import AccountPage from "../AccountPage/AccountPage";
import EditFirstName from "../AccountPage/EditFirstName";
import EditLastName from "../AccountPage/EditLastName";
import EditPassword from "../AccountPage/EditPassword";
import EditEmail from "../AccountPage/EditEmail";
import GenresPage from "../GenresPage/GenresPage";
import OrderConfirmationPage from "../OrderConfirmationPage/OrderConfirmationPage";
import BookReviewPage from "../BookReviewPage/BookReviewPage";
import { adminAtom } from "../../utilities/adminContext";
import AddBooksPage from "../AddBooksPage/AddBooksPage";
import EditBookPage from "../EditBookPage/EditBookPage";

export default function App() {
  const setIsAdmin = useSetAtom(adminAtom);
  const user = useAtomValue(userAtom);
  user.email === REACT_APP_EMAIL ? setIsAdmin(true) : setIsAdmin(false);

  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/genres/:genreId" element={<GenresPage />} />
        <Route path="/books/:id" element={<BooksDetailPage />} />
        <Route path="/books/:id/review" element={<BookReviewPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/cart/:userId/order-confirmation"
          element={<OrderConfirmationPage />}
        />
        <Route path="/books/add" element={<AddBooksPage />} />
        <Route path="/books/:id/edit" element={<EditBookPage />} />
      </Routes>
      {user ? (
        <Routes>
          <Route path="/account/:id/settings" element={<AccountPage />} />
          <Route
            path="/account/:id/settings/edit/first-name"
            element={<EditFirstName />}
          />
          <Route
            path="/account/:id/settings/edit/last-name"
            element={<EditLastName />}
          />
          <Route
            path="/account/:id/settings/edit/email"
            element={<EditEmail />}
          />
          <Route
            path="/account/:id/settings/edit/password"
            element={<EditPassword />}
          />
          <Route path="/account/:id/wishlist" element={<WishlistPage />} />
          <Route
            path="/account/:id/order-history"
            element={<OrderHistoryPage />}
          />
        </Routes>
      ) : (
        <AuthPage>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </AuthPage>
      )}
    </main>
  );
}
