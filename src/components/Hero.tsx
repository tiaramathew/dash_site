import AnimatedVisual from './AnimatedVisual';
import { Bot, Clock, TrendingDown } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Hero() {
  const sectionRef = useScrollReveal({ threshold: 0.1, staggerDelay: 100 });

  return (
    <section ref={sectionRef} id="hero" aria-label="Hero section" className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-28 text-center bg-gradient-to-b from-light-secondary via-light-primary to-light-secondary dark:from-dark-primary dark:via-dark-secondary dark:to-dark-primary transition-colors relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/8 rounded-full blur-3xl" style={{ animation: 'float-elegant 8s ease-in-out infinite' }}></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl" style={{ animation: 'float-elegant 10s ease-in-out infinite 2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" style={{ animation: 'float-elegant 12s ease-in-out infinite 4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-blue-500/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-indigo-500/30 dark:border-violet-500/30 mb-5 md:mb-7 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-violet-500/30 hover:border-violet-500/50 transition-all duration-500 shimmer-effect mx-2 sm:mx-4" aria-label="Comprehensive AI Solutions for Business Transformation">
            <Bot className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 dark:text-violet-400 animate-pulse flex-shrink-0" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 dark:from-indigo-400 dark:via-violet-400 dark:to-blue-400">
              Comprehensive AI Solutions for Business Transformation
            </span>
          </div>

          <h1 className="scroll-reveal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5 md:mb-7 tracking-tight px-3 sm:px-4" style={{ animationDelay: '0.1s' }}>
            <span className="text-gradient inline-block mb-2 md:mb-3">
              Intelligent AI Agents
            </span>
            <br />
            <span className="text-text-light-primary dark:text-text-dark-primary inline-block">
              for Every Business Need
            </span>
          </h1>

          <p className="scroll-reveal text-sm sm:text-base md:text-lg lg:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto mb-6 md:mb-10 leading-relaxed px-3 sm:px-4 font-medium" style={{ animationDelay: '0.2s' }}>
            Comprehensive AI solutions designed to automate, enhance, and transform every aspect of your business operations. From voice agents and chat bots to custom enterprise solutions and AI-powered marketing—personalized for your needs, available 24/7.
          </p>

          <div className="scroll-reveal flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 md:mb-12 px-3 sm:px-4" style={{ animationDelay: '0.3s' }}>
            <a
              href="#demo-form"
              className="w-full sm:w-auto inline-block bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 min-h-[48px] sm:min-h-[52px] flex items-center justify-center shadow-lg shadow-indigo-500/30 relative overflow-hidden group shimmer-effect"
              aria-label="Get started with AI agents"
            >
              <span className="relative z-10">Get Started</span>
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto inline-block bg-gradient-to-r from-light-primary/90 to-light-secondary/90 dark:from-dark-tertiary/90 dark:to-dark-secondary/90 backdrop-blur-sm text-text-light-primary dark:text-text-dark-primary border-2 border-indigo-500/30 dark:border-violet-500/30 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/60 transition-all duration-500 min-h-[48px] sm:min-h-[52px] flex items-center justify-center relative overflow-hidden group"
              aria-label="View our AI agent services"
            >
              <span className="relative z-10">View Services</span>
            </a>
          </div>

          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto mb-8 md:mb-12 px-3 sm:px-4" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-start gap-3 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-indigo-500/30 dark:border-indigo-500/20 shadow-lg shadow-indigo-500/10 hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-500 group" aria-label="24/7 Availability">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">24/7</div>
                <div className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary">Availability</div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-3 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-violet-500/30 dark:border-violet-500/20 shadow-lg shadow-violet-500/10 hover:shadow-xl hover:shadow-violet-500/20 hover:-translate-y-1 transition-all duration-500 group" aria-label="10x Efficiency Boost">
              <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-violet-600 dark:text-violet-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">10x</div>
                <div className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary">Efficiency</div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-3 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-blue-500/30 dark:border-blue-500/20 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-500 group" aria-label="70% Cost Reduction">
              <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">70%</div>
                <div className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary">Cost Reduction</div>
              </div>
            </div>
          </div>

          <AnimatedVisual />
        </div>
      </div>
    </section>
  );
}
