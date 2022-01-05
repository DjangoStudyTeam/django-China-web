import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import About from './pages/About';
import React from 'react';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
