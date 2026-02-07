import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WelcomeText from './components/WelcomeText';
import ScrollingSkills from './components/ScrollingSkills';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorBlob from './components/CursorBlob';

function App() {
  return (
    <div className="bg-dark min-h-screen text-white selection:bg-primary selection:text-white relative">
      <CursorBlob />
      <Navbar />
      <Hero />
      <WelcomeText />
      <About />
      <ScrollingSkills />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
