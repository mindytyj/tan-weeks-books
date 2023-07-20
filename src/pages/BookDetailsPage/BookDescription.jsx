export default function BookDescription({ book }) {
  return (
    <div className="uk-section uk-section-secondary uk-preserve-color uk-padding-remove">
      <div className="uk-container uk-margin-left uk-margin-right">
        <div className="uk-card uk-card-default uk-card-body">
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
}
