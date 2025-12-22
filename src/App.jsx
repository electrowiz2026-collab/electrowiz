import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Hero from "./sections/Hero";
import Home from "./pages/Home";
import EventCoordinators from "./components/EventCoordinators"; // or "./pages/EventCoordinators"

function App() {
  const [entered, setEntered] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Main route with Hero -> Home flow */}
        <Route 
          path="/" 
          element={
            !entered ? (
              <Hero onEnter={() => setEntered(true)} />
            ) : (
              <Home />
            )
          } 
        />
        
        {/* Coordinators page route */}
        <Route 
          path="/coordinators" 
          element={
           
              <EventCoordinators />
           
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;