export default function StockLabel({ book }) {
  const available = parseInt(book.qty) > 0;

  return available ? (
    <span className="uk-label uk-label-success">Available</span>
  ) : (
    <span className="uk-label uk-label-danger">Out of Stock</span>
  );
}
