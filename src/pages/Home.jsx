import React, { useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Hero from '../sections/Hero';
import WelcomeText from '../sections/WelcomeText';
import ScrollingSkills from '../components/ui/ScrollingSkills';
import About from '../sections/About';
import TechStack from '../sections/TechStack';
import ExperienceStats from '../sections/ExperienceStats';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Certificates from '../sections/Certificates';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import ScrollToTop from '../components/ui/ScrollToTop';
import CursorBlob from '../components/effects/CursorBlob';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there is a hash in the URL (e.g., #contact)
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
        window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="bg-white dark:bg-dark min-h-screen text-slate-900 dark:text-white selection:bg-primary selection:text-white relative transition-colors duration-300">
      <CursorBlob />
      <Navbar />
      <Hero />
      <WelcomeText />
      <About />
      <ScrollingSkills />
      <TechStack />
      <ExperienceStats />
      <Projects />
      <Experience />
      <Certificates />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
