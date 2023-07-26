import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import EditBookForm from "./EditBookForm";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function EditBookPage() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    async function getEditBookDetails() {
      setLoading(true);
      const retrievedBook = await sendRequest(`/api/books/edit/${id}`, "GET");
      setBook(retrievedBook);
      setLoading(false);
    }
    getEditBookDetails();
  }, []);

  if (loading === true) {
    return <LoadingScreen />;
  }

  return (
    <div className="uk-container uk-padding">
      <div className="uk-container uk-margin-left uk-margin-right">
        <h1 className="uk-text-center">Edit Book</h1>
        <EditBookForm book={book} setBook={setBook} />
      </div>
    </div>
  );
}
