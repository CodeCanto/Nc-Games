import { useEffect, useState } from "react";
import { fetchCategories } from "../api";

export function Navbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <>
      <h2>Select Review By Category</h2>
      <ul style={{ listStyle: "none" }} className="category-list">
        {categories.map((category) => {
          return (
            <li key={category.slug} className="category-item">
              <p>{category.slug}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
