
import React from 'react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Projects from '../components/Projects.jsx';
import Certificates from '../components/Certificates.jsx';
import Education from '../components/Education.jsx';
import Skills from '../components/Skills.jsx';
import Experience from '../components/Experience.jsx';
import Footer from '../components/Footer.jsx';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Education />
      <Skills />
      <Experience />
      <Footer />
    </div>
  );
};

export default Index;