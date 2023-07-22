export default function CartItem({ book }) {
  return (
    <div
      className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin"
      data-uk-grid
    >
      <div className="uk-card-media-left uk-cover-container">
        <img src="images/light.jpg" alt="" data-uk-cover />
        <canvas width="600" height="400"></canvas>
      </div>
      <div>
        <div className="uk-card-body">
          <h3 className="uk-card-title">{book.title}</h3>
          <p>{book.price}</p>
          <p>{book.qty}</p>
        </div>
      </div>
    </div>
  );
}
