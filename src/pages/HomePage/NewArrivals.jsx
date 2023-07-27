import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { Link } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function NewArrivals() {
  const [loading, setLoading] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    async function getNewArrivals() {
      try {
        setLoading(true);
        const books = await sendRequest("/api/books/newArrivals", "GET");
        setNewArrivals(books);
        setLoading(false);
      } catch {
        console.error("Failed to retrieve new arrivals.");
      }
    }
    getNewArrivals();
  }, []);

  if (loading === true) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="uk-h3 uk-text-center">New Arrivals</div>
      <div
        className="uk-position-relative uk-visible-toggle uk-light"
        tabindex="-1"
        data-uk-slider
      >
        <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">
          {newArrivals.map((newArrival) => {
            return (
              <li key={newArrival?.id}>
                <div className="uk-panel">
                  <Link to={`/books/${newArrival?.id}`}>
                    <img
                      src={newArrival?.image_url}
                      width="400"
                      height="600"
                      alt={newArrival?.title}
                    />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <Link
          className="uk-position-center-left uk-position-small uk-hidden-hover uk-slidenav-large"
          data-uk-slidenav-previous
          data-uk-slider-item="previous"
        ></Link>
        <Link
          className="uk-position-center-right uk-position-small uk-hidden-hover uk-slidenav-large"
          data-uk-slidenav-next
          data-uk-slider-item="next"
        ></Link>
      </div>
    </div>
  );
}
