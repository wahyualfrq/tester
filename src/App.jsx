import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Home from './pages/Home';

const AllCertificates = lazy(() => import('./pages/AllCertificates'));
const AllProjects = lazy(() => import('./pages/AllProjects'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/certificates" 
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark text-slate-900 dark:text-white">Loading...</div>}>
              <AllCertificates />
            </Suspense>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark text-slate-900 dark:text-white">Loading...</div>}>
              <AllProjects />
            </Suspense>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
