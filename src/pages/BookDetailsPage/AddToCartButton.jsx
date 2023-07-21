export default function AddToCartButton({ book }) {
  const disable = parseInt(book.qty) === 0;

  return (
    <button className="uk-button uk-button-primary" disabled={disable}>
      Add to Cart
    </button>
  );
}
