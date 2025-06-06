import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, Linkedin, Calendar, Users, ArrowLeft } from 'lucide-react';
import ImageCarousel from './ImageCarousel.jsx';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/Projects.json')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading projects:", error);
        setLoading(false);
      });
  }, []);

  const projectId = Number(id);
  const project = projects.find(p => p.id === projectId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Project not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Key Features Section
  const keyFeaturesSection = project["Key Features"]?.length > 0 && (
    <section className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
      <h3 className="font-semibold text-green-700 mb-4 text-lg">Key Features:</h3>
      <ul className="list-disc list-inside text-green-800 space-y-2">
        {project["Key Features"].map((feature, idx) => (
          <li key={idx}>{feature.replace(/^=>\s*/, '')}</li>
        ))}
      </ul>
    </section>
  );

  // Key Achievements Section
  const keyAchievementsSection = project.keyAchievements?.length > 0 && (
    <section className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
      <h3 className="font-semibold text-blue-700 mb-4 text-lg">Key Achievements:</h3>
      <ul className="list-disc list-inside text-blue-800 space-y-2">
        {project.keyAchievements.map((achievement, idx) => (
          <li key={idx}>{achievement}</li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-20">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {project.name}
              </h1>

              <div className="mb-6 text-gray-600 text-lg leading-relaxed">
                {project.description.map((line, idx) => (
                  <p key={idx} className="mb-2">{line}</p>
                ))}
              </div>

              {keyFeaturesSection}
              {keyAchievementsSection}

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 text-lg">Tech Stack:</h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span className="font-medium">{project.startYear} - {project.endYear}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span className="font-medium">{project.collaborators.length + 1} members</span>
                </div>
              </div>

              {project.collaborators.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 text-lg">Collaborators:</h3>
                  <div className="space-y-3">
                    {project.collaborators.map((collaborator, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">{collaborator.name}</span>
                        <div className="flex gap-3">
                          <a href={collaborator.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                            <Linkedin size={20} />
                          </a>
                          <a href={collaborator.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                            <Github size={20} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-8">
              <ImageCarousel images={project.images} />
              <div className="bg-gray-100 rounded-lg p-4 mt-6">
                <h3 className="font-semibold text-gray-700 mb-3 text-lg">Project Demo:</h3>
                <video
                  controls
                  className="w-full rounded-lg"
                  poster={project.images?.[0]}
                >
                  <source src={project.videoUrl} type="video/mp4" />
                  <p className="text-sm text-gray-500 mt-2">Your browser does not support the video tag.</p>
                </video>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
