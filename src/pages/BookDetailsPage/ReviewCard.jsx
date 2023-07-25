export default function ReviewCard({ review }) {
  return (
    <div className="uk-card uk-card-small uk-card-default uk-padding-small uk-margin-small-bottom">
      <article className="uk-comment" role="comment">
        <header className="uk-comment-header">
          <div className="uk-grid-medium uk-flex-middle" data-uk-grid>
            <div className="uk-width-expand">
              <h4 className="uk-comment-title uk-margin-remove">
                {review.first_name} {review.last_name}
              </h4>
            </div>
          </div>
        </header>
        <div className="uk-comment-body">
          {review.recommendation === "yes" ? (
            <span className="uk-text-small uk-text-italic">
              Recommends this book.
            </span>
          ) : (
            <span className="uk-text-small uk-text-italic">
              Does not recommend this book.
            </span>
          )}

          <p>{review.review}</p>
        </div>
      </article>
    </div>
  );
}
