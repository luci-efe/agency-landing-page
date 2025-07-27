'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function Contact() {
  const t = useTranslations('home');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-300/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Header & Info */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
              {t('contact.subtitle')}
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Email</div>
                  <div className="text-indigo-200">hello@agency.com</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Phone</div>
                  <div className="text-indigo-200">+1 (555) 123-4567</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Location</div>
                  <div className="text-indigo-200">Global Remote Team</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {['LinkedIn', 'Twitter', 'GitHub', 'Dribbble'].map((social) => (
                <button
                  key={social}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors duration-300 flex items-center justify-center"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="text-white text-sm font-bold">{social.slice(0, 2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={`transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Service Interest */}
                <div>
                  <label htmlFor="service" className="block text-white font-medium mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-apps">Mobile Applications</option>
                    <option value="consulting">Digital Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-white text-indigo-600 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>

                {/* Form Notice */}
                <div className="text-center">
                  <p className="text-indigo-200 text-sm">
                    * This form is for demonstration purposes and is not yet functional
                  </p>
                </div>
              </form>
            </div>

            {/* Additional CTA */}
            <div className="mt-8 text-center">
              <p className="text-indigo-200 mb-4">
                Prefer a direct approach?
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors duration-300">
                <span className="mr-2">📅</span>
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}