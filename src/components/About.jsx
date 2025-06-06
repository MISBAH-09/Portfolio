import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 pl-10 gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="prose prose-lg text-gray-600">
              <p>
                I’m a 5th semester Computer Science student passionate about web development and eager to apply my skills in real-world projects. I have hands-on experience building diverse applications, including a Clinic Management System using Python, PyQt5, and MySQL; Smart City Colaborative Dashboard Website developed with ReactJs, Tailwind CSS, and JavaScript , MongoDB; and a Mobile Purchasing Shop Management System built with Java and JavaFX.
              </p>
              <p>
                With expertise in modern web technologies including React, JavaScript, Node.js, and various frameworks, 
                I specialize in building responsive, user-friendly applications that solve real-world problems. 
                I am committed to writing clean, efficient code and continuously expanding my knowledge in modern technologies. 
                Beyond coding, I actively contribute to university societies and have earned several certifications in IT and cybersecurity, reflecting my dedication to professional growth and teamwork.
              </p>
              <p>
                When I'm not coding, you can find me contributing to open-source projects, learning new technologies, 
                or sharing knowledge with the developer community. I'm always excited to take on new challenges and 
                collaborate with like-minded professionals.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="bg-blue-50 px-4 py-2 rounded-full">
                <span className="text-blue-600 font-medium">Cooperative Problem Solver</span>
              </div>
              <div className="bg-purple-50 px-4 py-2 rounded-full">
                <span className="text-purple-600 font-medium">Adaptive Collaborator</span>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-full">
                <span className="text-green-600 font-medium">Continuous Learner</span>
              </div>
              <div className="bg-yellow-50 px-4 py-2 rounded-full">
                <span className="text-yellow-600 font-medium">Trusted Ally</span>
              </div>
               <div className="bg-lime-50 px-4 py-2 rounded-full">
                <span className="text-lime-600 font-medium">Team Work</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl transform rotate-6 absolute"></div>
              <div className="w-80 h-80 bg-gray-200 rounded-2xl relative overflow-hidden transform hover:rotate-3 transition-transform duration-300">
                <img 
                  src="../../public/picture.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
