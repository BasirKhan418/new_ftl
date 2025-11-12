import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import api from '../api/config';
import ChatBot from '../components/AIChat/ChatBot';
import ImageSlider from '../components/ImageSlider';
import { 
  FaFlask, 
  FaMicroscope, 
  FaCertificate, 
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaCogs,
  FaGraduationCap,
  FaBlog,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTie,
  FaAward,
  FaCalendarAlt
} from 'react-icons/fa';

const Home = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [equipmentRef, equipmentInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [teamRef, teamInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [internshipRef, internshipInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [blogRef, blogInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.3, triggerOnce: true });

  // Hero section images
  const heroImages = [
    '/images/Hero1.jpg',
    '/images/Hero2.jpg',
    '/images/Hero3.jpg',
    '/images/Hero4.jpg',
    '/images/Hero5.jpg'
  ];

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [contactLoading, setContactLoading] = useState(false);

  // Handle contact form input changes
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setContactLoading(true);
    
    try {
      const response = await api.post('/api/contact', contactForm);
      
      if (response.data.success) {
        toast.success('Message sent successfully! We will get back to you soon.');
        // Reset form
        setContactForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setContactLoading(false);
    }
  };

  const services = [
    {
      icon: FaFlask,
      title: 'Food Testing',
      description: 'Comprehensive analysis of food safety, quality parameters, nutritional labeling, pesticide residues, and heavy metals.',
      features: ['Proximate composition', 'Pesticide residues', 'Heavy metals', 'Mycotoxins']
    },
    {
      icon: FaMicroscope,
      title: 'Microbiological Testing',
      description: 'Advanced microbiological safety testing for various food and pharmaceutical products.',
      features: ['Total Plate Count', 'Yeast & Mold', 'Coliform', 'Salmonella']
    },
    {
      icon: FaCertificate,
      title: 'Pharmaceutical Testing',
      description: 'Drug purity analysis, contamination checks, and comprehensive excipient analysis.',
      features: ['Drug purity', 'Contamination checks', 'Excipient analysis', 'Quality control']
    },
    {
      icon: FaUsers,
      title: 'Training & Internships',
      description: 'Professional training programs and internship opportunities for students and researchers.',
      features: ['Hands-on training', 'Industry exposure', 'Skill development', 'Career guidance']
    }
  ];

  const stats = [
    { value: '2022', label: 'Established' },
    { value: '1000+', label: 'Tests Completed' },
    { value: '400+', label: 'Students Trained' },
    { value: '100%', label: 'NABL Accredited' }
  ];

  const equipment = [
    {
      icon: FaMicroscope,
      title: 'LC-MS/MS',
      description: 'Liquid Chromatography–Mass Spectrometry for high-precision analysis'
    },
    {
      icon: FaCogs,
      title: 'GC-MS/MS',
      description: 'Gas Chromatography–Mass Spectrometry for volatile compounds'
    },
    {
      icon: FaFlask,
      title: 'ICP-MS',
      description: 'Inductively Coupled Plasma–Mass Spectrometry for metals'
    },
    {
      icon: FaCertificate,
      title: 'HPLC',
      description: 'High-Performance Liquid Chromatography systems'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Preetha Bhadra',
      role: 'Managing Director',
      image: '/images/team/dr-preetha-bhadra.jpg'
    },
    {
      name: 'Prof. Supriya Pattanaik',
      role: 'Director',
      image: '/images/team/prof-supriya-pattanaik.jpg'
    },
    {
      name: 'Dr. Bhadram Kalyan Chekraverthy',
      role: 'Technical Manager (Chemical)',
      image: '/images/team/dr-bhadram-kalyan.jpg'
    },
    {
      name: 'Dr. Pratyush Kumar Das',
      role: 'Technical Manager (Biological)',
      image: '/images/team/dr-pratyush-kumar.jpg'
    }
  ];

  const recentBlogs = [
    {
      title: 'Advanced Food Safety Testing',
      excerpt: 'Comprehensive analysis ensuring quality at every step',
      date: '2024-01-15',
      slug: 'advanced-food-safety-testing-ensuring-quality-at-every-step'
    },
    {
      title: 'NABL Accreditation Achievement',
      excerpt: 'Milestone in quality excellence and international standards',
      date: '2024-01-10',
      slug: 'nabl-accreditation-achievement-milestone-in-quality-excellence'
    },
    {
      title: 'Technology Revolution in Labs',
      excerpt: 'How advanced instrumentation transforms testing capabilities',
      date: '2024-01-05',
      slug: 'technology-revolution-in-modern-food-testing-laboratories'
    }
  ];



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Image Slider Background */}
        <div className="absolute inset-0 w-full h-full">
          <ImageSlider images={heroImages} interval={6000} />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 text-center text-white w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8 py-8 md:py-0"
          >
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                <span className="block">Gram Tarang Food Testing</span>
                <span className="block text-yellow-300">Laboratory Pvt. Ltd.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed px-2 drop-shadow-md">
                NABL-accredited analytical testing laboratory ensuring safety, quality, and innovation in food, pharmaceutical, and marine product analysis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
              <Link 
                to="/services"
                className="w-full sm:w-auto bg-yellow-500 text-purple-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Our Services</span>
                <FaArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/contact"
                className="w-full sm:w-auto border-2 border-yellow-400 text-yellow-300 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-yellow-400 hover:text-purple-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white bg-opacity-10"
              >
                Get Quote
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 pt-4 md:pt-8">
              <div className="flex items-center space-x-2 bg-yellow-500 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaCertificate className="h-5 w-5 md:h-6 md:w-6 text-yellow-400" />
                <span className="text-xs md:text-sm font-medium">NABL Accredited</span>
              </div>
              <div className="flex items-center space-x-2 bg-yellow-500 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaCheckCircle className="h-5 w-5 md:h-6 md:w-6 text-yellow-400" />
                <span className="text-xs md:text-sm font-medium">ISO Certified</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center backdrop-blur-sm bg-white bg-opacity-10">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              About <span className="text-gradient">GTFTL</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              Established in 2022 as a NABL-accredited analytical testing laboratory, Gram Tarang Food Testing Lab 
              serves as both a commercial testing facility and a skill development hub for students, researchers, 
              and industry professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To bridge the gap between academia, industry, and regulatory standards while ensuring 
                  the highest quality in food, pharmaceutical, marine, and nutraceutical testing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <FaFlask className="h-6 w-6 md:h-8 md:w-8 text-red-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Advanced Equipment</h4>
                  <p className="text-xs md:text-sm text-gray-600">State-of-the-art instruments for accurate analysis</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <FaCertificate className="h-6 w-6 md:h-8 md:w-8 text-orange-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">NABL Accredited</h4>
                  <p className="text-xs md:text-sm text-gray-600">Nationally recognized testing standards</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/IMG_20250821_132458896.jpg" 
                  alt="Lab Equipment" 
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold text-base md:text-lg">Modern Laboratory</h4>
                  <p className="text-xs md:text-sm text-gray-200">Equipped with cutting-edge technology</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Comprehensive testing and analysis services with state-of-the-art equipment and expert professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 service-card border border-gray-100"
              >
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <div className="p-2 md:p-3 bg-red-100 rounded-full">
                    <service.icon className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <FaCheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 md:mt-6">
                  <Link 
                    to="/services" 
                    className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-2 group text-sm md:text-base"
                  >
                    <span>Learn More</span>
                    <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 md:py-20 bg-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 md:mb-6">Our Impact</h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto px-2">
              Numbers that reflect our commitment to excellence and quality
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-200 font-medium text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section ref={equipmentRef} className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={equipmentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Advanced Equipment</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              State-of-the-art analytical instruments ensuring accurate and reliable results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {equipment.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={equipmentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-red-600 mb-3 md:mb-4">
                    <IconComponent className="h-8 w-8 md:h-12 md:w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link 
              to="/equipment" 
              className="bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
            >
              View All Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Our Expert Team</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Dedicated professionals committed to excellence in analytical testing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4 md:p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-red-100 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center">
                  <FaUserTie className="h-8 w-8 md:h-12 md:w-12 text-red-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-red-600 font-medium text-sm md:text-base">{member.role}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link 
              to="/team" 
              className="bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
            >
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section ref={internshipRef} className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={internshipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Internship Programs</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Gain hands-on experience in food testing and analytical chemistry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={internshipInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="bg-orange-600 rounded-full p-2 md:p-3">
                    <FaGraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Duration: 1-6 months</h3>
                    <p className="text-gray-600 text-sm md:text-base">Flexible programs for B.Sc., M.Sc., and Ph.D. students</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="bg-red-600 rounded-full p-2 md:p-3">
                    <FaAward className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Certification</h3>
                    <p className="text-gray-600 text-sm md:text-base">Professional certificates and skill assessments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="bg-orange-600 rounded-full p-2 md:p-3">
                    <FaCalendarAlt className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Starting from ₹15,000</h3>
                    <p className="text-gray-600 text-sm md:text-base">Affordable fees with comprehensive training</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={internshipInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-xl p-6 md:p-8 shadow-lg order-1 lg:order-2"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Training Areas</h3>
              <ul className="space-y-2 md:space-y-3">
                {['Food testing', 'Pharmaceutical analysis', 'Microbiology', 'Molecular techniques', 'Animal cell culture', 'In silico analysis'].map((area, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <FaCheckCircle className="h-4 w-4 md:h-5 md:w-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm md:text-base">{area}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 md:mt-8">
                <Link 
                  to="/internship" 
                  className="w-full bg-orange-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 block text-center text-sm md:text-base"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section ref={blogRef} className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={blogInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Latest from Our Blog</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Stay updated with latest insights in food testing and analytical chemistry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recentBlogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={blogInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4 md:p-6">
                  <div className="flex items-center space-x-2 text-red-600 mb-3">
                    <FaBlog className="h-4 w-4" />
                    <span className="text-xs md:text-sm font-medium">{blog.date}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{blog.title}</h3>
                  <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">{blog.excerpt}</p>
                  <Link 
                    to={`/blog/${blog.slug}`}
                    className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-2 text-sm md:text-base"
                  >
                    <span>Read More</span>
                    <FaArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link 
              to="/blog" 
              className="bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Get in Touch</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Ready to start your testing project or have questions? We're here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8 order-2 lg:order-1"
            >
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-red-600 rounded-full p-2 md:p-3">
                  <FaMapMarkerAlt className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Location</h3>
                  <p className="text-gray-600 text-sm md:text-base">Plot No.1, IDCO Industrial Estate, Main Road, Paralakhemundi, Gajapati, Odisha – 751200</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-orange-600 rounded-full p-2 md:p-3">
                  <FaPhone className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm md:text-base">+91 XXXXX XXXXX</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-red-600 rounded-full p-2 md:p-3">
                  <FaEnvelope className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Email</h3>
                  <p className="text-gray-600 text-sm md:text-base">info@gtftl.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-xl p-6 md:p-8 shadow-lg order-1 lg:order-2"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Send us a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Your Name *"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="Your Email *"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    placeholder="Your Phone Number (Optional)"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    placeholder="Subject (Optional)"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Your Message *"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={contactLoading}
                  className={`w-full px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                    contactLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700'
                  } text-white`}
                >
                  {contactLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Contact us today for professional testing services or to learn about our internship programs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Link 
                to="/contact"
                className="w-full sm:w-auto bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                Get Quote
              </Link>
              <Link 
                to="/internship"
                className="w-full sm:w-auto border-2 border-red-600 text-red-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                Apply for Internship
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {/* AI ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Home;
