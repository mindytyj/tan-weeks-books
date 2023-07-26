import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreSelector from "../../components/FormSelectors.jsx/GenreSelector";
import LanguageSelector from "../../components/FormSelectors.jsx/LanguageSelector";
import PublisherSelector from "../../components/FormSelectors.jsx/PublisherSelector";
import AuthorSelector from "../../components/FormSelectors.jsx/AuthorSelector";
import sendRequest from "../../utilities/send-request";

export default function AddBookForm() {
  const [book, setBook] = useState({
    title: "",
    genreId: 1,
    description: "",
    languageId: 1,
    pages: "",
    isbn: "",
    publicationDate: "",
    publisherId: 1,
    authorId: 1,
    price: "",
    qty: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = { ...book };
      await sendRequest("/api/books", "POST", {
        formData,
      });
      navigate("/books");
    } catch (error) {
      console.log(error.message);
      setError("Failed to add book.");
    }
  }

  function handleChange(event) {
    setBook({ ...book, [event.target.name]: event.target.value });
  }

  console.log(book);

  return (
    <form
      className="uk-form-stacked uk-padding"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="title">
          Title
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <GenreSelector handleChange={handleChange} />
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="description">
          Description
        </label>
        <div className="uk-form-controls">
          <textarea
            className="uk-textarea"
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <LanguageSelector handleChange={handleChange} />
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="pages">
          Pages
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="text"
            id="pages"
            name="pages"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="isbn">
          ISBN
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="text"
            id="isbn"
            name="isbn"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="publicationDate">
          Publication Date
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="date"
            id="publicationDate"
            name="publicationDate"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <PublisherSelector handleChange={handleChange} />
      <AuthorSelector handleChange={handleChange} />
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="price">
          Price
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="text"
            id="price"
            name="price"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="qty">
          Quantity
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="text"
            id="qty"
            name="qty"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="imageUrl">
          Image Url
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="text"
            id="imageUrl"
            name="imageUrl"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button
        className="uk-button uk-button-secondary uk-align-center"
        type="submit"
      >
        Add Book
      </button>
      <p className="uk-text-center uk-text-meta uk-text-danger">{error}</p>
    </form>
  );
}
