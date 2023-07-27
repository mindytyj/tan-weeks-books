import { Link } from "react-router-dom";

export default function Promotions({ promotions }) {
  return (
    <div className="uk-container uk-align-center">
      <div className="uk-h3 uk-text-center">T-WB Promotions</div>

      <div
        className="uk-position-relative uk-visible-toggle uk-light"
        data-tabindex="-1"
        data-uk-slideshow="animation: fade"
      >
        <ul className="uk-slideshow-items">
          {promotions.map((promotion) => {
            return (
              <li key={promotion.id}>
                <img src={promotion.promotion_url} alt="" data-uk-cover />
              </li>
            );
          })}
        </ul>

        <Link
          className="uk-position-center-left uk-position-small uk-hidden-hover uk-slidenav-large"
          data-uk-slidenav-previous
          data-uk-slideshow-item="previous"
        ></Link>
        <Link
          className="uk-position-center-right uk-position-small uk-hidden-hover uk-slidenav-large"
          data-uk-slidenav-next
          data-uk-slideshow-item="next"
        ></Link>
      </div>
    </div>
  );
}
