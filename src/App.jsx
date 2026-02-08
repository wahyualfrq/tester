import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';

const AllCertificates = lazy(() => import('./pages/AllCertificates'));
const AllProjects = lazy(() => import('./pages/AllProjects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
          <Route 
            path="/projects/:id" 
            element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark text-slate-900 dark:text-white">Loading...</div>}>
                <ProjectDetail />
              </Suspense>
            } 
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
