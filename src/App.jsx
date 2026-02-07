import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllCertificates from './pages/AllCertificates';
import AllProjects from './pages/AllProjects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificates" element={<AllCertificates />} />
        <Route path="/projects" element={<AllProjects />} />
      </Routes>
    </Router>
  );
}

export default App;
