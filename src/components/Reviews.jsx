import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getReviews } from "../api.js";

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
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <label>Select an option:</label>
            <select value={dropdown} onChange={handleChangeSortBy}>
              <option value="">Select</option>
              <option value="created_at desc">Most Recent Date</option>
              <option value="created_at asc">Least Recent Date</option>
              <option value="votes desc">Most Votes</option>
              <option value="votes asc">Least Votes</option>
            </select>
          </div>

          <ul style={{ listStyle: "none" }}>
            {reviews.map((review) => {
              return (
                <li key={review.review_id} className="review-item">
                  <h2>{review.title}</h2>
                  <img src={review.review_img_url} alt="Review" />
                  <Link to={`/review/${review.review_id}`}>Full Review</Link>
                  <h5>User: {review.owner}</h5>
                  <h6>Votes: {review.votes}</h6>
                  <p>{review.created_at}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default Reviews;
