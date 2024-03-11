import { useEffect, useState } from "react";
import { fetchCategories } from "../api";
import { Link } from "react-router-dom";
import "./Navbar.css"

export function Navbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <>
      
      <div className="category-list-container">
      <h2 className="review-category-header">Filter Reviews By Category</h2>
        <ul className="category-list">
          {categories.map((category) => {
            return (
              <li className="category-list-item" key={category.slug}>
                <Link to={`/reviews/${category.slug}`}>{category.slug.toUpperCase()}</Link>
              </li>
            );
          })}
          <li className="category-list-item">
            <Link to={`/`}>ALL REVIEWS</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
