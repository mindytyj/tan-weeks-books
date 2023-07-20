import WishlistModal from "./WishlistModal";

export default function MainBookDetails({ book }) {
  function addWishlist() {
    console.log("Clicked");
    <WishlistModal />;
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
                onClick={addWishlist}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
