import { Eye, GitBranch, Shield } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AGUISection() {
  const sectionRef = useScrollReveal({ threshold: 0.1, staggerDelay: 150 });

  return (
    <section ref={sectionRef} id="ag-ui" aria-labelledby="ag-ui-heading" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-light-secondary dark:bg-dark-primary transition-colors relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-3 sm:px-4">
            <h2 id="ag-ui-heading" className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-text-light-primary dark:text-text-dark-primary tracking-tight">
              RAG Data Retrieval Technology
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto leading-relaxed">
              Our advanced Retrieval-Augmented Generation (RAG) system connects agents to your knowledge base, enabling accurate responses powered by your actual business data with real-time visualization and source attribution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-10 items-stretch mb-8 sm:mb-10 md:mb-12">
            <div className="scroll-reveal px-3 sm:px-4 lg:px-0">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 md:mb-5 text-text-light-primary dark:text-text-dark-primary">
                Smart Knowledge Access
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary mb-4 sm:mb-5 leading-relaxed">
                Our RAG (Retrieval-Augmented Generation) system connects your AI agents to your knowledge base, databases, documents, and APIs, enabling them to provide accurate, contextual responses using your actual business data—not generic training data.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                See which data sources were queried, how information is retrieved and synthesized, and track the complete decision path with transparent source attribution—ensuring data-powered accuracy and compliance.
              </p>
            </div>

            <div className="scroll-reveal bg-light-primary/80 dark:bg-dark-secondary/80 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-border-light dark:border-border-dark shadow-elevation-3 transition-all duration-300 relative overflow-hidden mx-3 sm:mx-4 lg:mx-0" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-4 sm:space-y-5 relative z-10">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-brand-indigo to-brand-violet flex items-center justify-center flex-shrink-0 shadow-elevation-2" aria-label="Eye icon for real-time visualization">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm md:text-base text-text-light-primary dark:text-text-dark-primary mb-1 sm:mb-1.5">
                      Real-Time Retrieval
                    </h4>
                    <p className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                      Watch as AI agents query your knowledge base and retrieve relevant information
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-brand-cyan to-brand-teal flex items-center justify-center flex-shrink-0 shadow-elevation-2" aria-label="Git branch icon for agent decision path">
                    <GitBranch className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm md:text-base text-text-light-primary dark:text-text-dark-primary mb-1 sm:mb-1.5">
                      Semantic Search
                    </h4>
                    <p className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                      Advanced vector search finds the most relevant information from your documents
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-brand-teal to-brand-emerald flex items-center justify-center flex-shrink-0 shadow-elevation-2" aria-label="Shield icon for interactive graph">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm md:text-base text-text-light-primary dark:text-text-dark-primary mb-1 sm:mb-1.5">
                      Source Attribution
                    </h4>
                    <p className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                      Every response includes citations showing exactly where information came from
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
