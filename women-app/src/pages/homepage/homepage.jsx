import React from "react";
import { motion } from "framer-motion";
import {
  HeartPulse,
  CalendarCheck,
  BookOpen,
  Users,
  ArrowRight,
  Gem,
  Leaf,
  Moon,
  Sun,
  Circle,
  Hexagon,
  Triangle,
} from "lucide-react";

const LandingPage = () => {
  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 font-sans text-gray-800 overflow-hidden relative">
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: -100, y: -100, rotate: 0 }}
          animate={{ x: [0, 100, 0], y: [0, 100, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-48 h-48 bg-purple-200 rounded-full absolute top-20 left-20 opacity-30"
        />
        <motion.div
          initial={{ x: -200, y: 200, rotate: 0 }}
          animate={{ x: [0, -200, 0], y: [0, 200, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 bg-purple-300 rounded-full absolute bottom-20 right-20 opacity-30"
        />
        <motion.div
          initial={{ x: 100, y: -200, rotate: 0 }}
          animate={{ x: [0, 100, 0], y: [0, -200, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 bg-purple-400 rounded-full absolute top-1/2 left-1/2 opacity-30"
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Gradient with Organic Shapes */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-700 opacity-95">
          {/* Organic Blob Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              className="absolute -top-20 -left-20 w-96 h-96 bg-purple-800 rounded-full blur-2xl"
            ></motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 1, ease: "easeOut" }}
              className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-800 rounded-full blur-2xl"
            ></motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-800 rounded-full blur-2xl"
            ></motion.div>
          </div>

          {/* Blending Effect at the Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-4">
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 leading-tight md:leading-snug"
          >
            Empowering Women Through Knowledge
          </motion.h1>
          <motion.p
            variants={slideIn}
            initial="hidden"
            animate="visible"
            className="mt-6 text-xl text-purple-100 max-w-2xl mx-auto"
          >
            A platform dedicated to simplifying women's health, rights, and
            wellness. Join us in raising awareness and fostering a supportive
            community.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-purple-500 text-white py-3 px-8 rounded-lg font-semibold shadow-lg hover:bg-purple-600 flex items-center mx-auto glow-on-hover"
          >
            Learn More <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </div>

        {/* Floating Leaves Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: -100,
                x: Math.random() * window.innerWidth,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: window.innerHeight,
                opacity: [0, 1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
              className="absolute w-8 h-8 text-purple-300"
              style={{ filter: "blur(1px)" }}
            >
              <Leaf className="w-full h-full" />
            </motion.div>
          ))}
        </div>

        {/* Subtle Pulse Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex justify-center items-center"
        >
          <div className="w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
        </motion.div>
      </section>
      {/* Key Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto relative">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-16">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Health Education",
              desc: "Simplified guides on women’s health topics.",
              icon: <HeartPulse className="w-12 h-12 text-purple-700" />,
              bg: "bg-purple-100",
              shape: (
                <Circle className="w-24 h-24 text-purple-300 absolute -top-8 -left-8 opacity-50" />
              ),
            },
            {
              title: "Rights Awareness",
              desc: "Learn about your rights and how to advocate for them.",
              icon: <BookOpen className="w-12 h-12 text-purple-700" />,
              bg: "bg-purple-100",
              shape: (
                <Hexagon className="w-24 h-24 text-purple-300 absolute -top-8 -right-8 opacity-50" />
              ),
            },
            {
              title: "Community Support",
              desc: "Connect with others and share your journey.",
              icon: <Users className="w-12 h-12 text-purple-700" />,
              bg: "bg-purple-100",
              shape: (
                <Triangle className="w-24 h-24 text-purple-300 absolute -bottom-8 -left-8 opacity-50" />
              ),
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -10, scale: 1.05 }}
              className={`${feature.bg} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all relative overflow-hidden border-2 border-transparent hover:border-purple-300`}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-purple-900 text-center">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-600 text-center">{feature.desc}</p>
              </div>
              {feature.shape}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-purple-100 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Our Mission Content */}
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate="visible"
            className="md:w-1/2 relative md:mr-12" // Added md:mr-12 for spacing
          >
            <h2 className="text-3xl font-bold text-purple-900">Our Mission</h2>
            <p className="mt-6 text-gray-700 text-lg">
              We are committed to providing accessible, evidence-based education
              on women's health and rights. Our goal is to empower women with
              knowledge and foster a supportive community.
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mt-12 md:mt-0 relative"
          >
            <div className="relative">
              {/* Background Shape */}
              <div className="absolute -top-4 -left-4 w-96 h-full bg-purple-400 rounded-xl transform rotate-3"></div>
              {/* Card Content */}
              <div className="relative bg-purple-500 rounded-xl p-8 shadow-lg w-96">
                <Users className="w-24 h-24 text-white mx-auto" />
                <h3 className="text-2xl font-semibold text-white text-center mt-6">
                  Join Our Community
                </h3>
                <p className="mt-4 text-purple-100 text-center">
                  Connect with women worldwide and share your journey.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Moon Animation */}
        <div className="absolute inset-0 flex justify-center items-center opacity-10">
          <Moon className="w-48 h-48 text-purple-400 animate-pulse-slow" />
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-purple-900 text-center relative overflow-hidden border-t-4 border-b-4 border-transparent hover:border-gradient-to-r from-purple-500 to-pink-500">
        <div className="relative z-10">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold text-white"
          >
            Start Your Journey Today
          </motion.h2>
          <div className="mt-8 flex justify-center space-x-6">
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-purple-500 text-white py-3 px-8 rounded-lg font-semibold shadow-lg hover:bg-purple-600 flex items-center glow-on-hover"
            >
              Explore Resources <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white text-purple-900 py-3 px-8 rounded-lg font-semibold shadow-lg hover:bg-purple-100 flex items-center glow-on-hover"
            >
              Join the Community <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center opacity-20">
          <Sun className="w-48 h-48 text-purple-400 animate-spin-slow" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-purple-900 to-purple-950 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold flex items-center">
              <HeartPulse className="mr-2 w-8 h-8 text-purple-700" /> Women’s
              Wellness
            </h3>
            <p className="mt-2 text-sm text-purple-300">
              © 2025 All Rights Reserved
            </p>
          </div>
          <ul className="mt-6 md:mt-0 flex space-x-8 text-purple-200">
            <li className="hover:text-purple-100 cursor-pointer">
              Health Education
            </li>
            <li className="hover:text-purple-100 cursor-pointer">
              Rights Awareness
            </li>
            <li className="hover:text-purple-100 cursor-pointer">Contact Us</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
