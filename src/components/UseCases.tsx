import { Headphones, ShoppingCart, Calendar, HelpCircle, Users, Building2, Settings, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function UseCases() {
  const sectionRef = useScrollReveal({ threshold: 0.1, staggerDelay: 120 });

  const cases = [
    {
      icon: Headphones,
      industry: 'Customer Support',
      title: 'Support Automation',
      subtitle: 'Instant ticket resolution',
      gradient: 'from-brand-indigo via-brand-violet to-brand-purple',
      borderColor: 'brand-indigo',
    },
    {
      icon: ShoppingCart,
      industry: 'E-Commerce',
      title: 'Sales Assistant',
      subtitle: 'Product recommendations',
      gradient: 'from-brand-pink via-brand-rose to-brand-orange',
      borderColor: 'brand-rose',
    },
    {
      icon: Calendar,
      industry: 'Scheduling',
      title: 'Appointment Booking',
      subtitle: 'Automated scheduling',
      gradient: 'from-brand-blue via-brand-cyan to-brand-teal',
      borderColor: 'brand-blue',
    },
    {
      icon: HelpCircle,
      industry: 'Knowledge Base',
      title: 'FAQ Automation',
      subtitle: 'Instant answers 24/7',
      gradient: 'from-brand-teal via-brand-emerald to-brand-amber',
      borderColor: 'brand-teal',
    },
    {
      icon: Users,
      industry: 'Lead Generation',
      title: 'Qualification',
      subtitle: 'Smart lead scoring',
      gradient: 'from-brand-violet via-brand-purple to-brand-pink',
      borderColor: 'brand-indigo',
    },
    {
      icon: Building2,
      industry: 'Enterprise',
      title: 'Internal Support',
      subtitle: 'Employee assistance',
      gradient: 'from-brand-cyan via-brand-teal to-brand-emerald',
      borderColor: 'brand-cyan',
    },
    {
      icon: Settings,
      industry: 'Enterprise Custom',
      title: 'Workflow Integration',
      subtitle: 'Proprietary system automation',
      gradient: 'from-brand-amber via-brand-orange to-brand-rose',
      borderColor: 'brand-orange',
    },
    {
      icon: TrendingUp,
      industry: 'Marketing',
      title: 'Video Ad Campaigns',
      subtitle: 'Rapid A/B testing and personalization',
      gradient: 'from-brand-emerald via-brand-teal to-brand-cyan',
      borderColor: 'brand-teal',
    },
  ];

  return (
    <section ref={sectionRef} id="use-cases" aria-labelledby="use-cases-heading" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-light-primary dark:bg-dark-secondary transition-colors relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-gradient-alt pointer-events-none opacity-10" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16 px-3 sm:px-4">
          <h2 id="use-cases-heading" className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-text-light-primary dark:text-text-dark-primary tracking-tight">
            Real-World Applications
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto leading-relaxed">
            Transform every customer touchpoint with intelligent automation across your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 max-w-7xl mx-auto items-start px-3 sm:px-0">
          {cases.map((useCase, index) => (
            <div
              key={index}
              className="scroll-reveal group relative bg-gradient-to-br from-light-primary/95 via-light-secondary/60 to-light-primary/95 dark:from-dark-primary/95 dark:via-dark-secondary/60 dark:to-dark-primary/95 p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl md:rounded-3xl border border-indigo-500/20 dark:border-violet-500/20 hover:border-indigo-500/50 dark:hover:border-violet-500/50 transition-all duration-500 shadow-lg shadow-indigo-500/10 hover:shadow-2xl hover:shadow-violet-500/30 hover:-translate-y-2 hover:scale-105 aspect-square flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>

              <div className="relative z-10 flex flex-col items-center justify-center gap-2.5 sm:gap-3 md:gap-4 w-full h-full px-2 py-3 sm:py-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center shadow-elevation-2 transition-all duration-500 border-2 border-white/30 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0`}>
                  <useCase.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                </div>

                <span className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-light-secondary/80 dark:bg-dark-secondary/80 text-text-light-primary dark:text-text-dark-primary text-xs font-bold rounded-full border border-brand-slate-200/40 dark:border-brand-slate-700/40 shadow-elevation-1 text-center flex-shrink-0 whitespace-nowrap">
                  {useCase.industry}
                </span>

                <h3 className="text-sm sm:text-base md:text-lg font-bold text-text-light-primary dark:text-text-dark-primary text-center leading-tight px-1">
                  {useCase.title}
                </h3>

                <p className="text-xs sm:text-xs md:text-sm text-text-light-secondary dark:text-text-dark-secondary text-center leading-relaxed px-1">
                  {useCase.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
