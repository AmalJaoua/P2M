import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import BrowsePage from "./pages/BrowsePage";
import WatchPage from "./pages/WatchPage";
import TestWatch from "./pages/HLSVideoPlayer"
function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<HomePage />} /> 
        <Route path="/testwatch" element={<TestWatch />} /> 
        
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/watch" element={<WatchPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
