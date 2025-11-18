import { Bot, Database, MessageSquare, Brain, Activity, Video } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';

interface WorkflowNode {
  id: string;
  icon: any;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationTimers = useRef<NodeJS.Timeout[]>([]);
  const isAnimatingRef = useRef(false);

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
      x: 12,
      y: 25,
      type: 'primary'
    },
    {
      id: 'agent',
      icon: Bot,
      label: 'AI Agent',
      sublabel: 'Orchestrator',
      x: 50,
      y: 25,
      type: 'agent'
    },
    {
      id: 'output',
      icon: MessageSquare,
      label: 'Output',
      sublabel: 'Response',
      x: 88,
      y: 25,
      type: 'primary'
    },
    {
      id: 'llm',
      icon: Brain,
      label: 'LLM',
      x: 28,
      y: 62,
      type: 'service'
    },
    {
      id: 'memory',
      icon: Database,
      label: 'Memory',
      x: 42,
      y: 75,
      type: 'service'
    },
    {
      id: 'vector',
      icon: Database,
      label: 'Vector Store',
      x: 58,
      y: 75,
      type: 'service'
    },
    {
      id: 'embeddings',
      icon: Video,
      label: 'Embeddings',
      x: 72,
      y: 62,
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
      { time: 900, action: () => { setCompletedNodes(['trigger']); setActiveConnections(['trigger-agent']); } },
      { time: 1300, action: () => { setCompletedConnections(['trigger-agent']); setActiveNode('agent'); setCurrentStageLabel('Agent processing...'); } },
      { time: 2100, action: () => { setActiveConnections(['agent-llm', 'agent-memory']); setCurrentStageLabel('Accessing LLM and memory...'); } },
      { time: 2600, action: () => { setCompletedConnections(['trigger-agent', 'agent-llm', 'agent-memory']); setActiveNode('llm'); } },
      { time: 3400, action: () => { setCompletedNodes(['trigger', 'llm', 'memory']); setActiveNode('agent'); setCurrentStageLabel('Retrieving knowledge...'); } },
      { time: 4100, action: () => { setActiveConnections(['agent-vector', 'agent-embeddings']); } },
      { time: 4600, action: () => { setCompletedConnections(['trigger-agent', 'agent-llm', 'agent-memory', 'agent-vector', 'agent-embeddings']); setActiveNode('vector'); } },
      { time: 5400, action: () => { setCompletedNodes(['trigger', 'llm', 'memory', 'vector', 'embeddings']); setActiveNode('agent'); setCurrentStageLabel('Generating response...'); } },
      { time: 6200, action: () => { setActiveConnections(['agent-output']); } },
      { time: 6600, action: () => { setCompletedConnections(['trigger-agent', 'agent-llm', 'agent-memory', 'agent-vector', 'agent-embeddings', 'agent-output']); setActiveNode('output'); } },
      { time: 7400, action: () => { setCompletedNodes(['trigger', 'llm', 'memory', 'vector', 'embeddings', 'agent', 'output']); setCurrentStageLabel('Complete!'); } },
      { time: 8000, action: () => { setCurrentStageLabel(''); setActiveNode(null); } }
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
      animationTimers.current.push(setTimeout(loop, 9000));
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

    const startX = fromNode.x;
    const startY = fromNode.y;
    const endX = toNode.x;
    const endY = toNode.y;

    let pathD: string;

    if (Math.abs(endY - startY) > 15) {
      const controlPointY = startY + (endY - startY) * 0.5;
      pathD = `M ${startX},${startY} Q ${startX},${controlPointY} ${(startX + endX) / 2},${controlPointY} T ${endX},${endY}`;
    } else {
      pathD = `M ${startX},${startY} L ${endX},${endY}`;
    }

    const strokeColor = status === 'completed' ? '#34d399' : status === 'active' ? '#22d3ee' : '#64748b';
    const strokeWidth = status === 'active' ? '0.35' : '0.2';

    return (
      <g key={index}>
        <path
          id={pathId}
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={conn.style === 'dashed' ? '1.5,1.5' : 'none'}
          opacity={status === 'idle' ? '0.4' : '0.9'}
          strokeLinecap="round"
        />
        {status === 'active' && (
          <circle r="0.5" fill="#22d3ee" opacity="1">
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        )}
      </g>
    );
  };

  const renderNode = (node: WorkflowNode) => {
    const status = getNodeStatus(node.id);

    const isPrimary = node.type === 'primary';
    const isAgent = node.type === 'agent';
    const isService = node.type === 'service';

    let nodeContent;

    if (isPrimary || isAgent) {
      nodeContent = (
        <div
          className={`relative backdrop-blur-sm transition-all duration-500 flex flex-col items-center justify-center gap-1 ${
            isAgent
              ? 'w-[140px] sm:w-[160px] h-[65px] sm:h-[75px]'
              : 'w-[100px] sm:w-[110px] h-[55px] sm:h-[60px]'
          } rounded-xl ${
            status === 'active'
              ? 'bg-gradient-to-br from-cyan-900/60 to-blue-900/60 border-2 border-cyan-400 shadow-lg shadow-cyan-500/30'
              : status === 'completed'
              ? 'bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-2 border-emerald-500/50'
              : 'bg-slate-900/70 border-2 border-slate-700/40'
          }`}
        >
          <div className={`transition-all duration-300 ${
            status === 'active' ? 'text-cyan-400' : status === 'completed' ? 'text-emerald-400' : 'text-slate-400'
          }`}>
            <node.icon className={`${isAgent ? 'w-6 h-6' : 'w-5 h-5'}`} strokeWidth={2} />
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className={`text-xs sm:text-sm font-semibold ${
              status === 'active' ? 'text-cyan-300' : status === 'completed' ? 'text-emerald-300' : 'text-slate-300'
            }`}>
              {node.label}
            </div>
            {node.sublabel && (
              <div className="text-[10px] text-slate-500">
                {node.sublabel}
              </div>
            )}
          </div>
        </div>
      );
    } else {
      nodeContent = (
        <div className="flex flex-col items-center gap-2">
          <div
            className={`relative backdrop-blur-sm transition-all duration-500 flex items-center justify-center w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full ${
              status === 'active'
                ? 'bg-gradient-to-br from-cyan-900/60 to-blue-900/60 border-2 border-cyan-400 shadow-lg shadow-cyan-500/30'
                : status === 'completed'
                ? 'bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-2 border-emerald-500/50'
                : 'bg-slate-900/70 border-2 border-slate-700/40'
            }`}
          >
            <div className={`transition-all duration-300 ${
              status === 'active' ? 'text-cyan-400' : status === 'completed' ? 'text-emerald-400' : 'text-slate-400'
            }`}>
              <node.icon className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>
          <div className={`text-[10px] sm:text-xs font-medium transition-colors text-center px-1 leading-tight ${
            status === 'active' ? 'text-cyan-300' : status === 'completed' ? 'text-emerald-300' : 'text-slate-400'
          }`}>
            {node.label}
          </div>
        </div>
      );
    }

    return (
      <div
        key={node.id}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{
          left: `${node.x}%`,
          top: `${node.y}%`,
          zIndex: isAgent ? 20 : isService ? 5 : 10
        }}
      >
        {nodeContent}
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="w-full max-w-6xl mx-auto mt-8 md:mt-12 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800/50 rounded-2xl shadow-2xl overflow-hidden">
      {currentStageLabel && (
        <div className="px-4 sm:px-6 pt-5 pb-2">
          <div className="flex items-center justify-center gap-2 text-cyan-400">
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">{currentStageLabel}</span>
          </div>
        </div>
      )}
      <div className="relative w-full h-[420px] sm:h-[460px] md:h-[500px] p-6 sm:p-8">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(148, 163, 184, 0.15) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative w-full h-full">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 1 }}>
            {connections.map((conn, index) => renderConnection(conn, index))}
          </svg>

          {nodes.map(node => renderNode(node))}
        </div>
      </div>
    </div>
  );
}
