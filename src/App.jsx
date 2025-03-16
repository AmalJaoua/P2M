import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Use Routes instead of Switch
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import BrowsePage from "./pages/BrowsePage";

function App() {
  return (
    <Router>
      <Routes>  {/* Replace Switch with Routes */}
        <Route path="/" element={<HomePage />} />  {/* Use element prop to pass the component */}
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/browse" element={<BrowsePage />} />
      </Routes>
    </Router>
  );
}

export default App;
