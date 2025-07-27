'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

export default function ServiceShowcase() {
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

  const services = [
    {
      key: 'webDev',
      icon: '🌐',
      gradient: 'from-blue-500 to-indigo-600',
      delay: 'delay-100',
    },
    {
      key: 'mobileApps',
      icon: '📱',
      gradient: 'from-indigo-500 to-purple-600',
      delay: 'delay-300',
    },
    {
      key: 'consulting',
      icon: '🚀',
      gradient: 'from-purple-500 to-pink-600',
      delay: 'delay-500',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 bg-gray-50 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'transform translate-y-0 opacity-100'
              : 'transform translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive digital solutions designed to elevate your
            business
          </p>
        </div>

        {/* 3D Scene Placeholder */}
        <div
          className={`mb-20 transition-all duration-1000 ease-out delay-200 ${
            isVisible
              ? 'transform translate-y-0 opacity-100'
              : 'transform translate-y-8 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-300/20 rounded-full blur-lg animate-pulse delay-1000" />
            </div>

            {/* 3D Scene Placeholder Content */}
            <div className="relative z-10">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <div className="text-6xl animate-bounce">🎯</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Interactive 3D Experience
              </h3>
              <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
                Coming soon: An immersive 3D scene where you can explore our
                services in an interactive digital environment
              </p>
              <div className="mt-6 inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white text-sm font-medium">
                  3D Scene Placeholder
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.key}
              className={`group transition-all duration-1000 ease-out ${service.delay} ${
                isVisible
                  ? 'transform translate-y-0 opacity-100'
                  : 'transform translate-y-8 opacity-0'
              }`}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                {/* Hover gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{service.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`services.${service.key}.description`)}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Elements Showcase */}
        <div
          className={`mt-20 text-center transition-all duration-1000 ease-out delay-700 ${
            isVisible
              ? 'transform translate-y-0 opacity-100'
              : 'transform translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-400"></div>
            </div>
            <span className="text-gray-600 font-medium">
              Ready for Interactive Development
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
