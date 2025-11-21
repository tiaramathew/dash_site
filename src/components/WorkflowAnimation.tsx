import { User, Brain, Database, Wrench, ShieldCheck, MessageSquare, Zap, Loader2, Activity } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function WorkflowAnimation() {
  const [activeNode, setActiveNode] = useState<number>(-1);
  const [completedNodes, setCompletedNodes] = useState<number[]>([]);
  const [activeEdges, setActiveEdges] = useState<number[]>([]);
  const [completedEdges, setCompletedEdges] = useState<number[]>([]);
  const [processingNodes, setProcessingNodes] = useState<number[]>([]);
  const [currentStageLabel, setCurrentStageLabel] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationTimers = useRef<NodeJS.Timeout[]>([]);

  // Handle responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            setIsAnimating(true);
            startAnimationLoop();
          } else if (!entry.isIntersecting && isAnimating) {
            stopAnimation();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [isAnimating]);

  const stopAnimation = useCallback(() => {
    animationTimers.current.forEach(timer => clearTimeout(timer));
    animationTimers.current = [];
    setIsAnimating(false);
  }, []);

  const startAnimationLoop = useCallback(() => {
    startAnimation();
    // Loop the animation every 12 seconds
    const loopTimer = setTimeout(() => {
      resetAnimation();
      startAnimationLoop();
    }, 12000);
    animationTimers.current.push(loopTimer);
  }, []);

  const resetAnimation = () => {
    setActiveNode(-1);
    setCompletedNodes([]);
    setActiveEdges([]);
    setCompletedEdges([]);
    setProcessingNodes([]);
    setCurrentStageLabel('');
  };

  const startAnimation = () => {
    animationTimers.current = [];

    // 1. Input (User)
    animationTimers.current.push(setTimeout(() => {
      setActiveNode(0);
      setCurrentStageLabel('Receiving user request...');
      setProcessingNodes([0]);
    }, 300));

    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0]);
      setProcessingNodes([]);
      setActiveEdges([0]); // Input -> Planner
    }, 1500));

    // 2. Planner (Brain)
    animationTimers.current.push(setTimeout(() => {
      setCompletedEdges([0]);
      setActiveNode(1);
      setCurrentStageLabel('Planner analyzing & decomposing task...');
      setProcessingNodes([1]);
    }, 2200));

    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0, 1]);
      setProcessingNodes([]);
      setActiveEdges([1, 2]); // Planner -> Memory & Tools
      setCurrentStageLabel('Fetching context & executing tools...');
    }, 3500));

    // 3. Memory & Tools (Parallel)
    animationTimers.current.push(setTimeout(() => {
      setCompletedEdges([0, 1, 2]);
      setActiveNode(2); // Memory
      setActiveNode(3); // Tools
      setProcessingNodes([2, 3]);
    }, 4200));

    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0, 1, 2, 3]);
      setProcessingNodes([]);
      setActiveEdges([3, 4]); // Memory/Tools -> Planner (Return)
    }, 5500));

    // 4. Planner (Integration)
    animationTimers.current.push(setTimeout(() => {
      setCompletedEdges([0, 1, 2, 3, 4]);
      setActiveNode(1); // Back to Planner
      setCurrentStageLabel('Integrating results & reasoning...');
      setProcessingNodes([1]);
    }, 6200));

    animationTimers.current.push(setTimeout(() => {
      setProcessingNodes([]);
      setActiveEdges([5]); // Planner -> Critic
    }, 7500));

    // 5. Critic (Validation)
    animationTimers.current.push(setTimeout(() => {
      setCompletedEdges([0, 1, 2, 3, 4, 5]);
      setActiveNode(4);
      setCurrentStageLabel('Validating response safety & accuracy...');
      setProcessingNodes([4]);
    }, 8200));

    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0, 1, 2, 3, 4]); // Keep Planner active-ish
      setProcessingNodes([]);
      setActiveEdges([6]); // Critic -> Output
    }, 9500));

    // 6. Output (Response)
    animationTimers.current.push(setTimeout(() => {
      setCompletedEdges([0, 1, 2, 3, 4, 5, 6]);
      setActiveNode(5);
      setCurrentStageLabel('Delivering final response!');
      setProcessingNodes([5]);
    }, 10200));

    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0, 1, 2, 3, 4, 5]); // All done
      setProcessingNodes([]);
      setActiveNode(-1);
      setCurrentStageLabel('');
    }, 11500));
  };

  // Define nodes with mobile/desktop positions
  const getNodes = (mobile: boolean) => [
    {
      id: 0,
      icon: User,
      label: 'Input',
      sublabel: 'User Request',
      x: mobile ? 50 : 10,
      y: mobile ? 10 : 50
    },
    {
      id: 1,
      icon: Brain,
      label: 'Planner',
      sublabel: 'Orchestrator',
      x: mobile ? 50 : 35,
      y: mobile ? 30 : 50
    },
    {
      id: 2,
      icon: Database,
      label: 'Memory',
      sublabel: 'Context/RAG',
      x: mobile ? 20 : 35,
      y: mobile ? 50 : 20
    },
    {
      id: 3,
      icon: Wrench,
      label: 'Tools',
      sublabel: 'API/Code',
      x: mobile ? 80 : 35,
      y: mobile ? 50 : 80
    },
    {
      id: 4,
      icon: ShieldCheck,
      label: 'Critic',
      sublabel: 'Validation',
      x: mobile ? 50 : 65,
      y: mobile ? 70 : 50
    },
    {
      id: 5,
      icon: MessageSquare,
      label: 'Output',
      sublabel: 'Response',
      x: mobile ? 50 : 90,
      y: mobile ? 90 : 50
    }
  ];

  const nodes = getNodes(isMobile);

  // Define edges based on node indices
  const edges = [
    { id: 0, from: 0, to: 1 }, // Input -> Planner
    { id: 1, from: 1, to: 2 }, // Planner -> Memory
    { id: 2, from: 1, to: 3 }, // Planner -> Tools
    { id: 3, from: 2, to: 1 }, // Memory -> Planner (Return)
    { id: 4, from: 3, to: 1 }, // Tools -> Planner (Return)
    { id: 5, from: 1, to: 4 }, // Planner -> Critic
    { id: 6, from: 4, to: 5 }  // Critic -> Output
  ];

  const getNodeStatus = (index: number) => {
    if (completedNodes.includes(index)) return 'completed';
    if (activeNode === index) return 'active';
    if (processingNodes.includes(index)) return 'processing';
    return 'idle';
  };

  const getEdgeStatus = (index: number) => {
    if (completedEdges.includes(index)) return 'completed';
    if (activeEdges.includes(index)) return 'active';
    return 'idle';
  };

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto mt-8 md:mt-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700/50 rounded-xl sm:rounded-2xl shadow-elevation-2 overflow-hidden">
      {currentStageLabel && (
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 md:pt-6">
          <div className="flex items-center justify-center gap-2 text-cyan-400 animate-pulse">
            <Activity className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">{currentStageLabel}</span>
          </div>
        </div>
      )}
      <div className="overflow-hidden relative">
        <div className={`relative w-full transition-all duration-500 ${isMobile ? 'h-[500px]' : 'h-[380px] sm:h-[420px] md:h-[460px]'} p-6 sm:p-8`}>
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              animation: 'grid-flow 20s linear infinite'
            }}></div>
          </div>
          <div className="relative w-full h-full">

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#14b8a6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <animate attributeName="x1" values="0%;100%;0%" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="x2" values="100%;200%;100%" dur="2s" repeatCount="indefinite" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {edges.map((edge, index) => {
                const fromNode = nodes[edge.from];
                const toNode = nodes[edge.to];
                const status = getEdgeStatus(index);

                const fromX = fromNode.x;
                const fromY = fromNode.y;
                const toX = toNode.x;
                const toY = toNode.y;

                // Calculate offset to start/end at node borders (approximate)
                const dx = toX - fromX;
                const dy = toY - fromY;
                const angle = Math.atan2(dy, dx);
                const offset = isMobile ? 6 : 4; // Percentage offset

                const startX = fromX + Math.cos(angle) * offset;
                const startY = fromY + Math.sin(angle) * offset;
                const endX = toX - Math.cos(angle) * offset;
                const endY = toY - Math.sin(angle) * offset;

                const isCurved = Math.abs(fromY - toY) > 10 && Math.abs(fromX - toX) > 10;

                let pathD;
                if (isCurved) {
                  const midX = (startX + endX) / 2;
                  const midY = (startY + endY) / 2;
                  // Add some curvature
                  const controlX = isMobile ? midX + (dx > 0 ? 10 : -10) : midX;
                  const controlY = isMobile ? midY : midY + (dy > 0 ? 10 : -10);

                  pathD = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
                } else {
                  pathD = `M ${startX},${startY} L ${endX},${endY}`;
                }

                const pathId = `edge-${index}`;
                const strokeColor = status === 'completed' ? '#10b981' : status === 'active' ? '#14b8a6' : '#475569';
                const strokeWidth = status === 'active' ? '0.8' : status === 'completed' ? '0.6' : '0.3';

                return (
                  <g key={index}>
                    {/* Background glow for active edges */}
                    {status === 'active' && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#14b8a6"
                        strokeWidth="2"
                        opacity="0.3"
                        strokeLinecap="round"
                        filter="url(#glow)"
                      />
                    )}
                    {/* Main edge path */}
                    <path
                      id={pathId}
                      d={pathD}
                      fill="none"
                      stroke={status === 'active' ? 'url(#activeGradient)' : strokeColor}
                      strokeWidth={strokeWidth}
                      opacity={status === 'idle' ? '0.4' : '1'}
                      strokeLinecap="round"
                      className={status === 'active' ? 'animate-pulse-subtle' : ''}
                    />
                    {/* Particles for active edges */}
                    {status === 'active' && (
                      <>
                        <circle r="0.8" fill="#06b6d4" opacity="0.8">
                          <animateMotion dur="1s" repeatCount="indefinite">
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                        </circle>
                        <circle r="0.6" fill="#14b8a6" opacity="0.9">
                          <animateMotion dur="1s" begin="0.3s" repeatCount="indefinite">
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                        </circle>
                      </>
                    )}
                    {/* Single particle for completed edges */}
                    {status === 'completed' && (
                      <circle r="0.5" fill="#10b981" opacity="0.6">
                        <animateMotion dur="3s" repeatCount="indefinite">
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {nodes.map((node, index) => {
              const status = getNodeStatus(index);

              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    zIndex: 10
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`relative bg-slate-800 rounded-xl transition-all duration-500 flex flex-col items-center justify-center ${isMobile ? 'min-w-[70px] p-2' : 'min-w-[90px] sm:min-w-[100px] p-3'
                        } ${status === 'active'
                          ? 'border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 scale-110'
                          : status === 'processing'
                            ? 'border-2 border-cyan-400 shadow-lg shadow-cyan-400/50'
                            : status === 'completed'
                              ? 'border-2 border-emerald-500 shadow-lg shadow-emerald-500/30'
                              : 'border-2 border-slate-600'
                        }`}
                    >
                      {/* Particle effects around active nodes */}
                      {status === 'active' && (
                        <>
                          <div className="absolute -top-2 -left-2 w-1 h-1 bg-cyan-400 rounded-full animate-float-particle"></div>
                          <div className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float-particle" style={{ animationDelay: '0.3s' }}></div>
                          <div className="absolute -bottom-2 -left-1 w-1 h-1 bg-teal-400 rounded-full animate-float-particle" style={{ animationDelay: '0.6s' }}></div>
                        </>
                      )}

                      <div className={`mb-1 transition-all duration-300 ${status === 'active' || status === 'processing' ? 'text-cyan-400 animate-pulse' : status === 'completed' ? 'text-emerald-400' : 'text-slate-400'
                        }`}>
                        {status === 'processing' ? (
                          <Loader2 className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} animate-spin`} strokeWidth={2.5} />
                        ) : (
                          <node.icon className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`} strokeWidth={2.5} />
                        )}
                      </div>

                      <div className={`text-[10px] sm:text-xs font-bold mb-0.5 text-center leading-tight ${status === 'active' || status === 'processing' ? 'text-cyan-300' : status === 'completed' ? 'text-emerald-300' : 'text-slate-400'
                        }`}>
                        {node.label}
                      </div>

                      {!isMobile && (
                        <div className="text-[9px] sm:text-[10px] text-slate-500 whitespace-nowrap text-center leading-tight">
                          {node.sublabel}
                        </div>
                      )}

                      {(status === 'active' || status === 'processing') && (
                        <>
                          <div className="absolute inset-0 rounded-xl border-2 border-cyan-400 animate-ping opacity-75"></div>
                          <div className="absolute -top-1.5 -right-1.5 flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg animate-pulse">
                            <Zap className="w-2 h-2" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes grid-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(var(--float-x, 10px), var(--float-y, -10px)) scale(1.5);
            opacity: 1;
          }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-float-particle {
          animation: float-particle 2s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
