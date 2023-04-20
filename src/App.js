import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Reviews from "./components/Reviews";
import Review from "./components/Review";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:id" element={<Review />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
