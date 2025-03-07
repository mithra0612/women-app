import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  CalendarCheck,
  BookOpen,
  Users,
  ArrowRight,
  Leaf,
  Moon,
  Sun,
  Circle,
  Hexagon,
  Triangle,
  Star,
  MessageCircle,
  Award,
  Heart,
  Shield,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Baby,
  Utensils,
  Bell,
  IndianRupee,
} from "lucide-react";

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const missionRef = useRef(null);
  const ctaRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(null);
  const [theme, setTheme] = useState("light");

  // Cursor following animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", () => setScrollY(window.scrollY));

    // Simulate loading for entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", () => setScrollY(window.scrollY));
      clearTimeout(timer);
    };
  }, []);

  // Parallax effects
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const featureY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const missionRotate = useTransform(scrollYProgress, [0.3, 0.5], [5, 0]);
  const missionScale = useTransform(scrollYProgress, [0.3, 0.5], [0.9, 1]);

  // 3D card tilt effect
  const calculateTilt = (e, ref) => {
    if (!ref.current) return { x: 0, y: 0 };
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    return { x: tiltX, y: tiltY };
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Feature cards data
  const featureCards = [
    {
      title: "Health Education",
      desc: "Culturally relevant health information and myth-busting resources for women in Tamil Nadu.",
      icon: <HeartPulse className="w-12 h-12 text-purple-700" />,
      bg: "bg-purple-100",
      shape: <Circle className="w-24 h-24 text-purple-300 absolute -top-8 -left-8 opacity-50" />,
      stats: ["Evidence-based", "Myth Busting", "Tamil Content"],
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "AI Health Planning",
      desc: "AI-powered diet planning and health tracking tools focused on Indian nutrition.",
      icon: <Utensils className="w-12 h-12 text-purple-700" />,
      bg: "bg-purple-100",
      shape: <Hexagon className="w-24 h-24 text-purple-300 absolute -top-8 -right-8 opacity-50" />,
      stats: ["PCOS Diet Plans", "Cycle Tracking", "Local Ingredients"],
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Government Schemes",
      desc: "Easy access to health-related government initiatives and benefits for women.",
      icon: <IndianRupee className="w-12 h-12 text-purple-700" />,
      bg: "bg-purple-100",
      shape: <Triangle className="w-24 h-24 text-purple-300 absolute -bottom-8 -left-8 opacity-50" />,
      stats: ["Step-by-Step Guides", "Application Help", "Direct Access"],
      color: "from-indigo-500 to-blue-500",
    },
  ];

  // Dynamic stats
  const stats = [
    { value: "Health", label: "Evidence-Based Content", icon: <BookOpen className="h-5 w-5" /> },
    { value: "AI", label: "Personalized Planning", icon: <CalendarCheck className="h-5 w-5" /> },
    { value: "24/7", label: "Interactive Support", icon: <MessageCircle className="h-5 w-5" /> },
    { value: "Tamil", label: "Cultural Relevance", icon: <Heart className="h-5 w-5" /> },
  ];

  // Animation variants
  const entryAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

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
    hover: {
      y: -15,
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const staggeredContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const staggeredItems = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={`min-h-screen font-sans text-gray-800 overflow-hidden relative ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-b from-purple-50 to-purple-100"
    }`}>
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme} 
        className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        {theme === "dark" ? 
          <Sun className="w-6 h-6 text-yellow-300" /> : 
          <Moon className="w-6 h-6 text-purple-700" />
        }
      </button>

      {/* Cursor Follow */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          backgroundColor: "white",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Initial Page Loading Animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-purple-900 z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{
                scale: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
                borderRadius: ["20%", "50%", "20%"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: {
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              },
            }}
            className={`absolute w-4 h-4 rounded-full ${
              theme === "dark" ? "bg-purple-700" : "bg-purple-300"
            }`}
            style={{ filter: "blur(1px)" }}
          />
        ))}
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: -100, y: -100, rotate: 0 }}
          animate={{ x: [0, 100, 0], y: [0, 100, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`w-48 h-48 ${
            theme === "dark" ? "bg-purple-800" : "bg-purple-200"
          } rounded-full absolute top-20 left-20 opacity-30`}
        />
        <motion.div
          initial={{ x: -200, y: 200, rotate: 0 }}
          animate={{ x: [0, -200, 0], y: [0, 200, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`w-64 h-64 ${
            theme === "dark" ? "bg-purple-900" : "bg-purple-300"
          } rounded-full absolute bottom-20 right-20 opacity-30`}
        />
        <motion.div
          initial={{ x: 100, y: -200, rotate: 0 }}
          animate={{ x: [0, 100, 0], y: [0, -200, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={`w-32 h-32 ${
            theme === "dark" ? "bg-purple-700" : "bg-purple-400"
          } rounded-full absolute top-1/2 left-1/2 opacity-30`}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden"
      >
        {/* Background Gradient with Organic Shapes */}
        <div className={`absolute inset-0 ${
          theme === "dark" 
            ? "bg-gradient-to-b from-gray-900 to-purple-900" 
            : "bg-gradient-to-b from-purple-900 to-purple-700"
        } opacity-95`}>
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
        <div className="relative z-10 px-4 max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={entryAnimation}
            className="mb-6 flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full inline-flex items-center">
              <Sparkles className="w-5 h-5 text-purple-300 mr-2" />
            </div>
          </motion.div>
          
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
            className="mt-6 text-xl text-purple-100 max-w-3xl mx-auto"
          >
            A culturally relevant platform dedicated to women's health in Tamil Nadu. Access accurate information, AI-powered tools, and government schemes in one place.
          </motion.p>
          
          {/* Get Started Button - Links to reproductive-phenomena */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 space-y-6"
          >
            <Link to="/reproductive-phenomena">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-10 rounded-full font-semibold shadow-lg hover:shadow-pink-500/20 flex items-center mx-auto relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:ml-3 transition-all" />
                </span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </Link>
            
            <motion.div 
              className="flex justify-center items-center space-x-6 text-purple-100"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <motion.div 
                whileHover={{ y: -3 }} 
                className="cursor-pointer"
                onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})}
              >
                <ChevronDown className="w-6 h-6" />
                <span className="text-sm">Scroll to explore</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Accent Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: -100,
                x: Math.random() * window.innerWidth,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [0, 1, 0],
                rotate: Math.random() * 360 + 360,
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
              {i % 3 === 0 ? <Leaf className="w-full h-full" /> : 
               i % 3 === 1 ? <Heart className="w-full h-full" /> : 
               <Star className="w-full h-full" />}
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
          <div className="w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className={`py-16 relative ${theme === "dark" ? "bg-gray-900" : "bg-white"}`} id="features">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggeredContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                variants={staggeredItems}
                whileHover={{ y: -5, scale: 1.05 }}
                className={`text-center p-6 rounded-xl ${
                  theme === "dark" ? "bg-gray-800" : "bg-purple-50"
                } shadow-lg border border-purple-100`}
              >
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white mb-4">
                  {stat.icon}
                </div>
                <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-purple-900"}`}>
                  {stat.value}
                </h3>
                <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section 
        ref={featuresRef} 
        className={`py-24 px-4 max-w-6xl mx-auto relative ${theme === "dark" ? "bg-gray-900" : ""}`}
        id="offerings"
      >
        <motion.div
          style={{ y: featureY }}
          className="relative z-10"
        >
          <div className="flex flex-col items-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 w-24 mb-6"
            ></motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`text-4xl font-bold text-center ${
                theme === "dark" ? "text-white" : "text-purple-900"
              } mb-4`}
            >
              What We Offer
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={`text-center max-w-2xl ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Comprehensive resources tailored for women in Tamil Nadu
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featureCards.map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-100px" }}
                onHoverStart={() => setActiveFeature(i)}
                onHoverEnd={() => setActiveFeature(null)}
                className={`${
                  theme === "dark" ? "bg-gray-800 border-gray-700" : feature.bg
                } rounded-xl p-8 shadow-lg hover:shadow-xl transition-all relative overflow-hidden border-2 border-transparent ${
                  activeFeature === i ? "border-gradient-to-r " + feature.color : ""
                }`}
              >
                <div className={`absolute inset-0 ${
                  theme === "dark" ? "bg-black/30" : "bg-white/10"
                } backdrop-blur-sm`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6 group">
                    {feature.icon}
                    <motion.div
                      animate={{
                        scale: activeFeature === i ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 1, repeat: activeFeature === i ? Infinity : 0 }}
                      className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-0 group-hover:opacity-20 blur-xl"
                    />
                  </div>
                  
                  <h3 className={`text-2xl font-semibold ${
                    theme === "dark" ? "text-white" : "text-purple-900"
                  } text-center mb-4`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`mb-6 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } text-center`}>
                    {feature.desc}
                  </p>
                  
                  <div className="flex justify-between items-center mt-6">
                    {feature.stats.map((stat, statIndex) => (
                      <motion.div 
                        key={statIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={activeFeature === i ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: statIndex * 0.1 }}
                        className={`text-xs font-semibold ${
                          theme === "dark" ? "text-purple-300" : "text-purple-700"
                        }`}
                      >
                        {stat}
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeFeature === i ? { opacity: 1, y: 0 } : {}}
                    className="mt-8 flex justify-center"
                  >
                    <Link to={`/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <button className={`px-6 py-2 rounded-full text-sm font-medium flex items-center ${
                        theme === "dark" 
                          ? "bg-purple-700 text-white hover:bg-purple-600" 
                          : "bg-purple-100 text-purple-900 hover:bg-purple-200"
                      }`}>
                        Learn more
                        <ArrowUpRight className="ml-2 w-4 h-4" />
                      </button>
                    </Link>
                  </motion.div>
                </div>
                
                {feature.shape}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <motion.section 
        ref={missionRef}
        style={{ rotate: missionRotate, scale: missionScale }}
        className={`py-24 ${theme === "dark" ? "bg-gray-800" : "bg-purple-50"} relative overflow-hidden`}
        id="mission"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 w-24 mb-6"></div>
                <h2 className={`text-4xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-purple-900"}`}>
                  Our Mission
                </h2>
                <p className={`text-lg mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  We believe that access to accurate, culturally relevant information about women's health should be a universal right. Our mission is to break down barriers, dispel myths, and connect women in Tamil Nadu with the resources they need to make informed decisions.
                </p>
                <p className={`text-lg mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Through education, AI-powered tools, and access to government schemes, we're building a platform where all women have the knowledge and support to prioritize their wellbeing.
                </p>
                <div className="flex items-center space-x-4 mt-8">
                  <Shield className="w-6 h-6 text-purple-500" />
                  <span className={`${theme === "dark" ? "text-purple-300" : "text-purple-700"} font-medium`}>
                    Privacy-focused & secure platform
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <Award className="w-6 h-6 text-purple-500" />
                  <span className={`${theme === "dark" ? "text-purple-300" : "text-purple-700"} font-medium`}>
                    Expert-verified content
                  </span>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className={`w-full h-80 md:h-96 ${theme === "dark" ? "bg-purple-900/30" : "bg-purple-200"} rounded-2xl overflow-hidden shadow-xl relative`}>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 opacity-80"
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
                
                {/* Image collage or illustration would go here */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8 w-full h-full">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="rounded-lg overflow-hidden shadow-lg bg-white/20 backdrop-blur-md flex items-center justify-center"
                    >
                      <Baby className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="rounded-lg overflow-hidden shadow-lg bg-white/20 backdrop-blur-md flex items-center justify-center"
                    >
                      <Users className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="rounded-lg overflow-hidden shadow-lg bg-white/20 backdrop-blur-md flex items-center justify-center"
                    >
                      <HeartPulse className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="rounded-lg overflow-hidden shadow-lg bg-white/20 backdrop-blur-md flex items-center justify-center"
                    >
                      <Bell className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Redesigned CTA Section */}
      <section 
        ref={ctaRef}
        className={`py-24 ${theme === "dark" ? "bg-gray-900" : "bg-white"} relative`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-3xl overflow-hidden shadow-2xl relative`}
          >
            {/* Layered design with card effect */}
            <div className="relative">
              {/* Background layer with gradient and pattern */}
              <div className={`absolute inset-0 ${
                theme === "dark" 
                  ? "bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800" 
                  : "bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-500"
              }`}>
                {/* Geometric pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute border-2 border-white/20 rounded-full"
                      style={{
                        width: `${Math.random() * 200 + 50}px`,
                        height: `${Math.random() * 200 + 50}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Content layer with glass effect cards */}
              <div className="relative z-10 p-12 md:p-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Left column - text content */}
                  <div className="text-left">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6"
                    >
                      <Sparkles className="w-4 h-4 text-purple-200 mr-2" />
                      <span className="text-purple-100 text-sm font-medium">WellCare Community</span>
                    </motion.div>
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                    >
                      Join Our Thriving Community
                    </motion.h2>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="text-xl text-purple-100 mb-8"
                    >
                      Take control of your health journey with personalized resources, supportive networks, and powerful tools designed for women in Tamil Nadu.
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                    >
                      <Link to="/signup">
                        <motion.button
                          whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                          whileTap={{ scale: 0.97 }}
                          className="relative overflow-hidden group bg-white text-purple-700 py-3 px-8 rounded-lg font-semibold shadow-lg flex items-center justify-center w-full sm:w-auto"
                        >
                          <span className="relative z-10">Create Account</span>
                          <motion.span 
                            className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-200"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.4 }}
                          />
                          <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </Link>
                      
                      <Link to="/learn-more">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="bg-white/10 backdrop-blur-md text-white py-3 px-8 rounded-lg font-medium border border-white/20 flex items-center justify-center w-full sm:w-auto hover:bg-white/20 transition-all"
                        >
                          Explore Features
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                  
                  {/* Right column - stats & visual elements */}
                  <div className="hidden md:block">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10"
                    >
                      <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white">WellCare Impact</h3>
                        <Sparkles className="w-5 h-5 text-purple-300" />
                      </div>
                      
                      <div className="space-y-4">
                        {/* Stats items */}
                        <div className="flex items-center p-3 bg-white/5 rounded-lg">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg mr-4">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">50+ Women</h4>
                            <p className="text-purple-200 text-sm">Developed based on surveys of 50+ women</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-white/5 rounded-lg">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg mr-4">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">200+ Resources</h4>
                            <p className="text-purple-200 text-sm">Quality content</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-white/5 rounded-lg">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg mr-4">
                            <Shield className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">100% Privacy</h4>
                            <p className="text-purple-200 text-sm">End-to-end encryption</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Dynamic particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: Math.random() * 100, 
                      y: Math.random() * 100,
                      opacity: 0.3,
                      scale: 0.5
                    }}
                    animate={{ 
                      x: [Math.random() * 100, Math.random() * 100 + 50],
                      y: [Math.random() * 100, Math.random() * 100 + 50],
                      opacity: [0.2, 0.5, 0.2],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 8 + Math.random() * 5, 
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                    className="absolute w-6 h-6 bg-white rounded-full blur-sm"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 ${theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-purple-900 text-purple-200"}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">WellCare</h3>
              <p className="mb-6 max-w-md">
                Empowering women through culturally relevant health information, AI tools, and access to government resources.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-purple-300">
                  <span className="sr-only">Twitter</span>
                  {/* Twitter Icon */}
                </a>
                <a href="#" className="text-white hover:text-purple-300">
                  <span className="sr-only">Instagram</span>
                  {/* Instagram Icon */}
                </a>
                <a href="#" className="text-white hover:text-purple-300">
                  <span className="sr-only">Facebook</span>
                  {/* Facebook Icon */}
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Health Education</a></li>
                <li><a href="#" className="hover:text-white">Cycle Tracking</a></li>
                <li><a href="#" className="hover:text-white">Government Schemes</a></li>
                <li><a href="#" className="hover:text-white">Diet Planning</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Our Mission</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-purple-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 WellCare. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <select className="bg-purple-800 text-white px-3 py-1 rounded">
                <option>English</option>
                <option>Tamil</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

