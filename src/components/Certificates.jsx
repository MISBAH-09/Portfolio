import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState('tech');
  const [modalImage, setModalImage] = useState(null);
  const [data, setData] = useState({ certificates: {}, categories: [] });

  // Fetch JSON data from public/data
  useEffect(() => {
    fetch('/data/Certificates.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to fetch certificates:', err));
  }, []);

  const { certificates, categories } = data;
  const reversedCertificates = certificates[activeCategory]
    ? [...certificates[activeCategory]].reverse()
    : [];

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  return (
    <section id="certificates" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Certificates
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-${category.color}-600 text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reversedCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => openModal(cert.image)}
              >
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <Award className="text-yellow-500" size={20} />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {cert.name}
                </h3>
                <p className="text-gray-600 mb-4">{cert.issuer}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>{cert.date}</span>
                  </div>

                  {activeCategory !== 'volunteer' && cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                      <span>View Credential</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {modalImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="relative max-w-4xl max-h-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-gray-300"
                aria-label="Close modal"
              >
                &times;
              </button>
              <img
                src={modalImage}
                alt="Certificate full view"
                className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
