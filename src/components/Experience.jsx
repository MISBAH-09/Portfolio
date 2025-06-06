import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Users, Github, Linkedin } from 'lucide-react';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/Experience.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch experience data');
        }
        return res.json();
      })
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const reversedExperiences = [...experiences].reverse();

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-gray-600 text-lg">Loading experiences...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  if (reversedExperiences.length === 0) {
    return (
      <section id="experience" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-gray-600 text-lg">No experience yet</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

            {reversedExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex items-start mb-12 last:mb-0"
              >
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>

                <div className="ml-20 bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-start gap-4 mb-4 lg:mb-0">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <Briefcase className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{exp.role}</h3>
                        <h4 className="text-xl font-semibold text-blue-600 mb-2">{exp.organization}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{exp.startYear} - {exp.endYear}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                      {exp.duration}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>

                  {exp.technologies?.length > 0 && (
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-700 mb-3">Technologies Used:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {exp.achievements?.length > 0 && (
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-700 mb-3">Key Achievements:</h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.collaborators?.length > 0 && (
                    <div className="border-t pt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Users size={16} className="text-gray-600" />
                        <h5 className="font-semibold text-gray-700">Collaborators:</h5>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {exp.collaborators.map((collaborator, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                            <span className="text-gray-700">{collaborator.name}</span>
                            <div className="flex gap-2">
                              {collaborator.linkedin && (
                                <a
                                  href={collaborator.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                                >
                                  <Linkedin size={16} />
                                </a>
                              )}
                              {collaborator.github && (
                                <a
                                  href={collaborator.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
                                >
                                  <Github size={16} />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
