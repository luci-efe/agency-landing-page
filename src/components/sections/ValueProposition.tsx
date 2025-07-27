'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function ValueProposition() {
  const t = useTranslations('home');
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const valuePoints = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized performance that delivers results',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '🎯',
      title: 'Precision Focused',
      description: 'Targeted solutions for maximum impact',
      gradient: 'from-indigo-400 to-purple-500'
    },
    {
      icon: '🚀',
      title: 'Future Ready',
      description: 'Scalable architecture for growth',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      icon: '💎',
      title: 'Premium Quality',
      description: 'Excellence in every detail',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  const testimonials = [
    {
      content: "The team delivered an exceptional digital experience that exceeded our expectations and drove remarkable business growth.",
      author: "Sarah Chen",
      role: "CEO, TechCorp",
      avatar: "SC"
    },
    {
      content: "Their innovative approach and technical expertise transformed our vision into a stunning reality that our customers love.",
      author: "Michael Rodriguez",
      role: "Founder, StartupX",
      avatar: "MR"
    },
    {
      content: "Outstanding results! They delivered a world-class solution that perfectly captures our brand and engages our audience.",
      author: "Emily Watson",
      role: "CMO, Global Ventures",
      avatar: "EW"
    }
  ];

  return (
    <section ref={sectionRef} id="value" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50/50 to-purple-50/50" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-indigo-100 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-r from-purple-100 to-transparent rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('value.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('value.description')}
          </p>
        </div>

        {/* Value Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {valuePoints.map((point, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 ease-out ${
                isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${point.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-2xl">{point.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {point.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Success Metrics */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 ease-out delay-600 ${
          isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl">
            <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-700 font-medium">Projects Completed</div>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-gray-700 font-medium">Client Satisfaction</div>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
            <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-700 font-medium">Support Available</div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className={`transition-all duration-1000 ease-out delay-800 ${
          isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl" />
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-300/10 rounded-full blur-lg" />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-12">
                What Our Clients Say
              </h3>

              {/* Testimonial Content */}
              <div className="relative h-48 mb-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === activeTestimonial 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-4'
                    }`}
                  >
                    <blockquote className="text-lg md:text-xl text-indigo-100 mb-6 max-w-3xl mx-auto leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div className="text-left">
                        <div className="text-white font-semibold">{testimonial.author}</div>
                        <div className="text-indigo-300 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-white scale-125' 
                        : 'bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}