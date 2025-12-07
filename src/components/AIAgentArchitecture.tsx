import { Bot, Database, MessageSquare, Brain, Video, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef, useCallback, ElementType } from 'react';

interface WorkflowNode {
  id: string;
  icon: ElementType;
  label: string;
  sublabel?: string;
  desktop: { x: number; y: number };
  mobile: { x: number; y: number };
  type: 'primary' | 'agent' | 'service';
}

interface Connection {
  from: string;
  to: string;
  style: 'solid' | 'dashed';
}

export default function AIAgentArchitecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const [completedConnections, setCompletedConnections] = useState<string[]>([]);
  const [currentStageLabel, setCurrentStageLabel] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationTimers = useRef<NodeJS.Timeout[]>([]);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stopAnimation = useCallback(() => {
    animationTimers.current.forEach(timer => clearTimeout(timer));
    animationTimers.current = [];
    isAnimatingRef.current = false;
  }, []);

  const resetAnimation = useCallback(() => {
    setActiveNode(null);
    setCompletedNodes([]);
    setActiveConnections([]);
    setCompletedConnections([]);
    setCurrentStageLabel('');
  }, []);

  const nodes: WorkflowNode[] = [
    {
      id: 'trigger',
      icon: MessageSquare,
      label: 'Input',
      sublabel: 'User Query',
      desktop: { x: 15, y: 50 },
      mobile: { x: 50, y: 10 },
      type: 'primary'
    },
    {
      id: 'agent',
      icon: Bot,
      label: 'AI Agent',
      sublabel: 'Orchestrator',
      desktop: { x: 50, y: 50 },
      mobile: { x: 50, y: 35 },
      type: 'agent'
    },
    {
      id: 'output',
      icon: Sparkles,
      label: 'Output',
      sublabel: 'Response',
      desktop: { x: 85, y: 50 },
      mobile: { x: 50, y: 90 },
      type: 'primary'
    },
    {
      id: 'llm',
      icon: Brain,
      label: 'LLM',
      desktop: { x: 35, y: 20 },
      mobile: { x: 20, y: 55 },
      type: 'service'
    },
    {
      id: 'memory',
      icon: Database,
      label: 'Memory',
      desktop: { x: 65, y: 20 },
      mobile: { x: 80, y: 55 },
      type: 'service'
    },
    {
      id: 'vector',
      icon: Database,
      label: 'Vector Store',
      desktop: { x: 35, y: 80 },
      mobile: { x: 20, y: 75 },
      type: 'service'
    },
    {
      id: 'embeddings',
      icon: Video,
      label: 'Embeddings',
      desktop: { x: 65, y: 80 },
      mobile: { x: 80, y: 75 },
      type: 'service'
    }
  ];

  const connections: Connection[] = [
    { from: 'trigger', to: 'agent', style: 'solid' },
    { from: 'agent', to: 'output', style: 'solid' },
    { from: 'agent', to: 'llm', style: 'dashed' },
    { from: 'agent', to: 'memory', style: 'dashed' },
    { from: 'agent', to: 'vector', style: 'dashed' },
    { from: 'agent', to: 'embeddings', style: 'dashed' }
  ];

  const startAnimation = useCallback(() => {
    stopAnimation();
    resetAnimation();

    const stages = [
      { time: 200, action: () => { setActiveNode('trigger'); setCurrentStageLabel('Receiving input...'); } },
      { time: 1000, action: () => { setCompletedNodes(['trigger']); setActiveConnections(['trigger-agent']); } },
      { time: 1500, action: () => { setCompletedConnections(['trigger-agent']); setActiveNode('agent'); setCurrentStageLabel('Agent processing...'); } },
      { time: 2500, action: () => { setActiveConnections(['agent-llm', 'agent-memory', 'agent-vector', 'agent-embeddings']); setCurrentStageLabel('Querying services...'); } },
      { time: 3500, action: () => { setCompletedConnections(['trigger-agent', 'agent-llm', 'agent-memory', 'agent-vector', 'agent-embeddings']); setActiveNode('llm'); setActiveNode('memory'); setActiveNode('vector'); setActiveNode('embeddings'); } },
      { time: 4500, action: () => { setCompletedNodes(['trigger', 'llm', 'memory', 'vector', 'embeddings']); setActiveNode('agent'); setCurrentStageLabel('Synthesizing response...'); } },
      { time: 5500, action: () => { setActiveConnections(['agent-output']); } },
      { time: 6200, action: () => { setCompletedConnections(['trigger-agent', 'agent-llm', 'agent-memory', 'agent-vector', 'agent-embeddings', 'agent-output']); setActiveNode('output'); setCurrentStageLabel('Delivering output...'); } },
      { time: 7200, action: () => { setCompletedNodes(['trigger', 'llm', 'memory', 'vector', 'embeddings', 'agent', 'output']); setCurrentStageLabel('Complete'); } },
      { time: 8500, action: () => { setCurrentStageLabel(''); setActiveNode(null); } }
    ];

    stages.forEach(({ time, action }) => {
      animationTimers.current.push(setTimeout(action, time));
    });
  }, [stopAnimation, resetAnimation]);

  const startAnimationLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const loop = () => {
      if (!isAnimatingRef.current) return;
      startAnimation();
      animationTimers.current.push(setTimeout(loop, 9500));
    };

    loop();
  }, [startAnimation]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimatingRef.current) {
            startAnimationLoop();
          } else if (!entry.isIntersecting && isAnimatingRef.current) {
            stopAnimation();
            resetAnimation();
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
  }, [startAnimationLoop, stopAnimation, resetAnimation]);

  const getNodeStatus = (id: string) => {
    if (completedNodes.includes(id)) return 'completed';
    if (activeNode === id) return 'active';
    return 'idle';
  };

  const getConnectionStatus = (fromId: string, toId: string) => {
    const key = `${fromId}-${toId}`;
    if (completedConnections.includes(key)) return 'completed';
    if (activeConnections.includes(key)) return 'active';
    return 'idle';
  };

  const renderConnection = (conn: Connection, index: number) => {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    if (!fromNode || !toNode) return null;

    const status = getConnectionStatus(conn.from, conn.to);
    const pathId = `path-${conn.from}-${conn.to}`;

    const start = isMobile ? fromNode.mobile : fromNode.desktop;
    const end = isMobile ? toNode.mobile : toNode.desktop;

    const startX = start.x;
    const startY = start.y;
    const endX = end.x;
    const endY = end.y;

    let pathD: string;

    // Enhanced curved logic for smoother "organic" feel
    const dist = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

    if (isMobile) {
      const midY = (startY + endY) / 2;
      // Add subtle curvature reset for vertical lines
      if (Math.abs(startX - endX) < 5) {
        pathD = `M ${startX},${startY} L ${endX},${endY}`;
      } else {
        pathD = `M ${startX},${startY} C ${startX},${midY} ${endX},${midY} ${endX},${endY}`;
      }
    } else {
      // Horizontal heavy flow
      const controlOffset = dist * 0.4;
      // If it's a primary horizontal flow (trigger -> agent -> output)
      if (conn.to === 'agent' || conn.from === 'agent') {
        if (conn.to === 'output' || conn.from === 'trigger') {
          // S-curve for horizontal
          pathD = `M ${startX},${startY} C ${startX + controlOffset},${startY} ${endX - controlOffset},${endY} ${endX},${endY}`;
        } else {
          // Radiation style for services (agent -> services)
          // We want them to look like they are branching out from the center
          pathD = `M ${startX},${startY} L ${endX},${endY}`;
        }
      } else {
        pathD = `M ${startX},${startY} L ${endX},${endY}`;
      }
    }

    const strokeColor = status === 'completed' ? '#34d399' : status === 'active' ? '#06b6d4' : '#334155'; // emerald-400 / cyan-500 / slate-700
    const strokeOpacity = status === 'idle' ? 0.2 : 0.6;
    const strokeWidth = status === 'active' ? 1.5 : 1;

    // Comet effect gradient definition would be global, but here we simulate with path manipulation or layered paths

    return (
      <g key={index}>
        {/* Base Path (Track) */}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={conn.style === 'dashed' ? '4,4' : 'none'}
          opacity={strokeOpacity}
          strokeLinecap="round"
          className="transition-all duration-500"
        />

        {/* Active Particle (Comet) */}
        {status === 'active' && (
          <>
            {/* Glow Trail */}
            <circle r="3" fill="#22d3ee" className="filter blur-[4px]">
              <animateMotion dur="1s" repeatCount="1" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
            {/* Core Particle */}
            <circle r="1.5" fill="#f0fdfa">
              <animateMotion dur="1s" repeatCount="1" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
          </>
        )}

        {/* Invisible path for reference */}
        <path id={pathId} d={pathD} fill="none" stroke="transparent" />
      </g>
    );
  };

  const renderNode = (node: WorkflowNode) => {
    const status = getNodeStatus(node.id);
    const isAgent = node.type === 'agent';
    const isService = node.type === 'service';
    const pos = isMobile ? node.mobile : node.desktop;

    return (
      <div
        key={node.id}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          zIndex: isAgent ? 20 : 10
        }}
      >
        <div className="flex flex-col items-center gap-3 group">
          <div
            className={`relative flex items-center justify-center transition-all duration-500 backdrop-blur-xl border
              ${isAgent
                ? 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl' // Bigger Agent Node
                : isService
                  ? 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl'
                  : 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl'
              }
              ${status === 'active'
                ? 'bg-cyan-500/20 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.4)] scale-110'
                : status === 'completed'
                  ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900/50 border-white/10 hover:border-white/20 hover:bg-slate-800/50'
              }
            `}
          >
            {/* Ping Effect for Active State */}
            {status === 'active' && (
              <div className={`absolute inset-0 rounded-inherit animate-ping opacity-75 ${isAgent ? 'bg-cyan-400/20' : 'bg-cyan-500/30'}`}></div>
            )}

            <div className={`relative z-10 transition-colors duration-300 ${status === 'active' ? 'text-cyan-300' :
                status === 'completed' ? 'text-emerald-300' :
                  'text-slate-400 group-hover:text-slate-200'
              }`}>
              <node.icon
                className={`${isAgent ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-6 h-6 sm:w-7 sm:h-7'}`}
                strokeWidth={isAgent ? 1.5 : 2}
              />
            </div>

            {/* Status Micro-indicator */}
            {status === 'active' && (
              <div className="absolute top-0 right-0 w-3 h-3 -mt-1 -mr-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"></div>
            )}
            {status === 'completed' && (
              <div className="absolute top-0 right-0 w-3 h-3 -mt-1 -mr-1 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            )}

          </div>

          {/* Labels */}
          <div className={`flex flex-col items-center transition-all duration-300 ${status === 'active' ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-70'
            }`}>
            <span className={`text-[10px] sm:text-xs font-bold tracking-wider uppercase ${status === 'active' ? 'text-cyan-200 shadow-cyan-500/50 drop-shadow-sm' :
                status === 'completed' ? 'text-emerald-300' :
                  'text-slate-400'
              }`}>
              {node.label}
            </span>
            {node.sublabel && !isMobile && (
              <span className="text-[9px] text-slate-500 mt-0.5 tracking-tight">{node.sublabel}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="w-full max-w-6xl mx-auto py-12 md:py-20 relative px-4">

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-900/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl overflow-hidden ring-1 ring-white/5">

        {/* Header / Status Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-30 pointer-events-none">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/40 border border-white/5 backdrop-blur-lg">
            <div className={`w-2.5 h-2.5 rounded-full shadow-lg ${currentStageLabel ? 'bg-cyan-400 shadow-cyan-500/50 animate-pulse' : 'bg-slate-700'
              }`}></div>
            <span className="text-sm font-medium text-slate-200 tracking-wide">
              {currentStageLabel || 'System Idle'}
            </span>
          </div>

          {/* Decorative dots */}
          <div className="flex gap-2 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
          </div>
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        </div>

        {/* Animation Area */}
        <div className={`relative w-full transition-all duration-500 ${isMobile ? 'h-[600px]' : 'h-[500px]'}`}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {connections.map((conn, index) => renderConnection(conn, index))}
          </svg>

          {nodes.map(node => renderNode(node))}
        </div>
      </div>
    </div>
  );
}
