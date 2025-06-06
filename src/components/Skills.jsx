import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Palette, Server } from 'lucide-react';

const iconMap = {
  Code,
  Server,
  Database,
  Palette,
};

const getColorClasses = (color, type) => {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      progress: "bg-blue-600",
      border: "border-blue-200",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      progress: "bg-purple-600",
      border: "border-purple-200",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      progress: "bg-green-600",
      border: "border-green-200",
    },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-600",
      progress: "bg-pink-600",
      border: "border-pink-200",
    },
  };
  return colors[color]?.[type] || '';
};

const Skills = () => {
  const [skillData, setSkillData] = useState([]);

  useEffect(() => {
    fetch('/data/Skills.json')
      .then((res) => res.json())
      .then((data) => setSkillData(data))
      .catch((err) => console.error("Failed to load skills.json", err));
  }, []);

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillData.map((category, catIndex) => {
            const Icon = iconMap[category.icon] || Code;
            const color = category.color;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: catIndex * 0.1 }}
                className={`rounded-xl p-8 border ${getColorClasses(color, 'bg')} ${getColorClasses(color, 'border')} hover:shadow-lg transition-shadow duration-300`}
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg border ${getColorClasses(color, 'bg')} ${getColorClasses(color, 'border')}`}>
                    <Icon className={getColorClasses(color, 'text')} size={24} />
                  </div>
                  <h3 className={`text-xl font-bold ${getColorClasses(color, 'text')}`}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: (catIndex * 0.2) + (skillIdx * 0.05) }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${getColorClasses(color, 'progress')}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: (catIndex * 0.2) + (skillIdx * 0.05) }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Additional Competencies
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Computer Networks (LAN/WAN, Subnetting, Routing Protocols)",
                "Network Security Basics",
                "Packet Analysis (Wireshark, TCP/IP Stack)",
                "Network Simulation Tools (Cisco Packet Tracer)",
                "Responsive Web Design",
                "Problem Solving and Debugging",
                "Team Collaboration using Agile/Scrum",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-white rounded-full shadow-sm text-gray-700 hover:shadow-md transition-shadow duration-300 text-sm md:text-base"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
