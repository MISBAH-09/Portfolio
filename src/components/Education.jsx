import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch('/data/Education.json') // Make sure the file is inside `public/` folder
      .then((res) => res.json())
      .then((data) => setEducation(data))
      .catch((error) => console.error('Error fetching education data:', error));
  }, []);

  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex items-start mb-12 last:mb-0"
              >
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>

                <div className="ml-20 bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 w-full">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <GraduationCap className="text-blue-600" size={24} />
                      <h3 className="text-2xl font-bold text-gray-800">{edu.degree}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                      <Calendar size={16} />
                      <span>{edu.startYear} - {edu.endYear}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">{edu.institution}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{edu.location}</span>
                      </div>
                      <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        {edu.grade}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{edu.description}</p>

                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3">Key Achievements:</h5>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
