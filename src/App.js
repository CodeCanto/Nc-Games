import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Reviews />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/reviews/:category" element={<Reviews />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
