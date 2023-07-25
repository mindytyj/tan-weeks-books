export default function Promotions() {
  return (
    <div className="uk-container uk-align-center">
      <div className="uk-h3 uk-text-center">T-WB Promotions</div>

      <div
        className="uk-position-relative uk-visible-toggle uk-light"
        tabindex="-1"
        uk-slideshow="animation: fade"
      >
        <ul className="uk-slideshow-items">
          <li>
            <img src="" alt="" uk-cover />
          </li>
          <li>
            <img src="" alt="" uk-cover />
          </li>
          <li>
            <img src="" alt="" uk-cover />
          </li>
        </ul>

        <a
          className="uk-position-center-left uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-previous
          uk-slideshow-item="previous"
        ></a>
        <a
          className="uk-position-center-right uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-next
          uk-slideshow-item="next"
        ></a>
      </div>
    </div>
  );
}
