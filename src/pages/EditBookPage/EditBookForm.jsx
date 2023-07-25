import { useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useNavigate } from "react-router-dom";

export default function EditBookForm({ book, setBook }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = { ...book };
      await sendRequest(`/api/books/${book.id}`, "PUT", {
        formData,
      });
      navigate(`/books/${book.id}`);
    } catch (error) {
      console.error(error.message);
      setError("Failed to edit book.");
    }
  }

  function handleChange(event) {
    setBook({ ...book, [event.target.name]: event.target.value });
  }

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
            value={book?.title || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="description">
          Description
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="text"
            id="description"
            name="description"
            value={book?.description || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>
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
            value={book?.pages || ""}
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
            value={book?.isbn || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>
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
            value={book?.price || ""}
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
            value={book?.qty || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="image_url">
          Image Url
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            type="text"
            id="image_url"
            name="image_url"
            value={book?.image_url || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button
        className="uk-button uk-button-secondary uk-align-center"
        type="submit"
      >
        Save Changes
      </button>
      <p className="uk-text-center uk-text-meta uk-text-danger">{error}</p>
    </form>
  );
}
