'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Hero() {
  const t = useTranslations('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-600 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-300/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div 
          className={`transition-all duration-1000 ease-out ${
            isVisible 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block animate-fade-in-up delay-300">
              {t('hero.title').split(' ').slice(0, 2).join(' ')}
            </span>
            <br />
            <span className="inline-block animate-fade-in-up delay-500 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              {t('hero.title').split(' ').slice(2).join(' ')}
            </span>
          </h1>
        </div>

        <div 
          className={`transition-all duration-1000 ease-out delay-300 ${
            isVisible 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-8 opacity-0'
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>

        <div 
          className={`transition-all duration-1000 ease-out delay-500 ${
            isVisible 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 focus:outline-none focus:ring-4 focus:ring-white/30">
              <span className="relative z-10">{t('hero.cta')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-indigo-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/30">
              {t('hero.learnMore')}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out delay-1000 ${
            isVisible 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-sm mb-2">{t('hero.scrollToExplore')}</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}