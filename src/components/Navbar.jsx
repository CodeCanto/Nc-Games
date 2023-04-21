import { useEffect, useState } from "react";
import { fetchCategories } from "../api";
import { Link } from "react-router-dom";

export function Navbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <>
      <h2 className="review-category-header">Select Review By Category</h2>
      <div className="category-container">
        <ul style={{ listStyle: "none" }} className="category-list">
          {categories.map((category) => {
            return (
              <li key={category.slug} className="category-item">
                <Link to={`/reviews/${category.slug}`}>{category.slug}</Link>
              </li>
            );
          })}
          <li>
            <Link to={`/`}>All Reviews</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
