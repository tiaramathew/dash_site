import { useScrollReveal } from '../hooks/useScrollReveal';
import AIAgentArchitecture from './AIAgentArchitecture';

export default function WorkflowSection() {
  const sectionRef = useScrollReveal({ threshold: 0.1, staggerDelay: 150 });

  return (
    <section ref={sectionRef} id="workflow" aria-labelledby="workflow-heading" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-light-primary dark:bg-dark-primary transition-colors relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-3 md:px-4">
            <h2 id="workflow-heading" className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-text-light-primary dark:text-text-dark-primary tracking-tight">
              AI Agent Architecture
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto leading-relaxed">
              Watch how a modern AI agent leverages LLM processing, memory systems, RAG retrieval, and multimodal capabilities to deliver intelligent, context-aware responses powered by your data.
            </p>
          </div>

          <AIAgentArchitecture />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12 px-2 sm:px-4">
            <div className="scroll-reveal bg-light-secondary/50 dark:bg-dark-secondary/50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-border-light dark:border-border-dark">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-text-light-primary dark:text-text-dark-primary">
                LLM Core Processing
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                Advanced language models serve as the central intelligence, processing queries with sophisticated understanding and reasoning capabilities to generate accurate responses.
              </p>
            </div>

            <div className="scroll-reveal bg-light-secondary/50 dark:bg-dark-secondary/50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-border-light dark:border-border-dark" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-text-light-primary dark:text-text-dark-primary">
                Memory Systems
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                Short-term memory provides fast context caching for conversations, while long-term storage maintains historical knowledge for personalized and contextually relevant interactions.
              </p>
            </div>

            <div className="scroll-reveal bg-light-secondary/50 dark:bg-dark-secondary/50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-border-light dark:border-border-dark" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-text-light-primary dark:text-text-dark-primary">
                RAG & Multimodal Output
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                Retrieval-Augmented Generation connects to your knowledge base for accurate data-driven responses. Structured outputs and multimodal capabilities handle text, images, audio, and video seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
