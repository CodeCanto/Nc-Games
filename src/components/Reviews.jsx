import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getReviews } from "../api.js";
import "./Reviews.css";

const defaultSort = "created_at desc";

function Reviews() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const [dropdown, setDropdown] = useState(defaultSort);

  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  const handleChangeSortBy = (e) => {
    const { value } = e.target;
    const [sortBy, order] = value.split(" ");
    const newParams = new URLSearchParams(searchParams);

    newParams.set("sort_by", sortBy);
    newParams.set("order", order);

    setDropdown(value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    switch (true) {
      case sortByQuery && orderQuery:
        setDropdown(`${sortByQuery} ${orderQuery}`);
        break;
      case sortByQuery:
        setDropdown(`${sortByQuery} desc`);
        break;
      case orderQuery:
        setDropdown(`created_at ${orderQuery}`);
        break;
      default:
        setDropdown(defaultSort);
        break;
    }
  }, [category, sortByQuery, orderQuery]);

  useEffect(() => {
    setIsLoading(true);

    getReviews({ category: category, sort_by: sortByQuery, order: orderQuery })
      .then((reviews) => {
        setReviews(reviews);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [category, sortByQuery, orderQuery]);

  return (
    <div>
      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <>
          <div className="drop-down">
            <label className="select-category-label">Sort by</label>
            <select value={dropdown} onChange={handleChangeSortBy}>
              <option value="">Select</option>
              <option value="created_at desc">Most Recent Date</option>
              <option value="created_at asc">Least Recent Date</option>
              <option value="votes desc">Most Votes</option>
              <option value="votes asc">Least Votes</option>
            </select>
          </div>
          <ul className="review-list">
            {reviews.map((review) => {
              const colorArray = ['#ED5565', '#A0D468', '#4FC1E9', '#EC87C0', '#FFCE54', '#AC92EC']
              let randomColor = Math.round(Math.random() * (colorArray.length - 1))
              const selectedColor = colorArray[randomColor]
              return (
                <Link to={`/review/${review.review_id}`} className="review-item"
                style={{background: `linear-gradient(to bottom, ${selectedColor} 0 50%, white 50% 100%)`}}
                key={review.review_id}>
                  <div className="review-item-container">
                    <li>
                      <div className="review-item-content">
                        <h2 className="review-item-header">{review.title}</h2>
                        <img className="review-item-img" src={review.review_img_url} alt="Review" />
                        <div className="review-stats">
                          <p>User: <b>{review.owner}</b></p>
                          <p>Votes: <b>{review.votes}</b></p>
                          <p><em>{review.created_at}</em></p>
                        </div>
                      </div>
                    </li>
                  </div>
                </Link>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default Reviews;
