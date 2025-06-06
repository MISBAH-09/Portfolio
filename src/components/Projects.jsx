import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/Projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data.reverse()); // Show latest entries first
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading project data:', err);
        setLoading(false);
      });
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center text-gray-600">Loading projects...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.images && project.images.length > 0 ? project.images[0] : ''} 
                  alt={project.name}
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">{project.name}</h3>
                <div className="flex justify-center gap-4">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${project.name} GitHub`}
                    >
                      <Github size={24} />
                    </a>
                  )}
                  {project.linkedin && (
                    <a 
                      href={project.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${project.name} LinkedIn`}
                    >
                      <Linkedin size={24} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
