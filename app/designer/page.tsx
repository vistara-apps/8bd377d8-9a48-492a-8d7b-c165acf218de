'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Save, Play, Plus, Trash2, Settings2 } from 'lucide-react';

interface Component {
  id: string;
  type: 'ai-model' | 'action' | 'logic' | 'start' | 'end';
  name: string;
  x: number;
  y: number;
  config?: Record<string, any>;
}

export default function Designer() {
  const [components, setComponents] = useState<Component[]>([
    { id: 'start', type: 'start', name: 'Start', x: 100, y: 200 },
    { id: 'end', type: 'end', name: 'End', x: 700, y: 200 }
  ]);

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const componentLibrary = [
    { type: 'ai-model', name: 'OpenAI GPT-4', icon: '🤖' },
    { type: 'ai-model', name: 'Claude', icon: '🧠' },
    { type: 'action', name: 'Send Email', icon: '📧' },
    { type: 'action', name: 'HTTP Request', icon: '🌐' },
    { type: 'logic', name: 'Conditional', icon: '🔀' },
    { type: 'logic', name: 'Loop', icon: '🔁' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">Visual Designer</span>
            </Link>
            <div className="flex gap-4">
              <button className="btn-secondary flex items-center gap-2">
                <Save className="w-5 h-5" />
                Save Draft
              </button>
              <Link href="/test/new" className="btn-primary flex items-center gap-2">
                <Play className="w-5 h-5" />
                Test Agent
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex">
        {/* Component Library Sidebar */}
        <aside className="w-64 border-r border-border p-4 overflow-y-auto">
          <h3 className="font-bold mb-4">Component Library</h3>
          
          <div className="space-y-2">
            <div className="text-sm text-muted mb-2">AI Models</div>
            {componentLibrary.filter(c => c.type === 'ai-model').map((comp, idx) => (
              <ComponentLibraryItem key={idx} component={comp} />
            ))}
            
            <div className="text-sm text-muted mb-2 mt-4">Actions</div>
            {componentLibrary.filter(c => c.type === 'action').map((comp, idx) => (
              <ComponentLibraryItem key={idx} component={comp} />
            ))}
            
            <div className="text-sm text-muted mb-2 mt-4">Logic</div>
            {componentLibrary.filter(c => c.type === 'logic').map((comp, idx) => (
              <ComponentLibraryItem key={idx} component={comp} />
            ))}
          </div>
        </aside>

        {/* Canvas */}
        <main className="flex-1 relative overflow-hidden bg-bg">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
            {/* Workflow Canvas */}
            <div className="relative w-full h-full">
              {components.map((comp) => (
                <WorkflowNode
                  key={comp.id}
                  component={comp}
                  selected={selectedComponent === comp.id}
                  onClick={() => setSelectedComponent(comp.id)}
                />
              ))}
            </div>
          </div>

          {/* Instructions Overlay */}
          <div className="absolute top-4 left-4 right-4 card max-w-2xl mx-auto">
            <h3 className="font-bold mb-2">Getting Started</h3>
            <p className="text-sm text-muted">
              Drag components from the library onto the canvas. Connect them to create your AI agent workflow.
              Click on components to configure their settings.
            </p>
          </div>
        </main>

        {/* Properties Panel */}
        <aside className="w-80 border-l border-border p-4 overflow-y-auto">
          <h3 className="font-bold mb-4">Properties</h3>
          
          {selectedComponent ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-2">Component Name</label>
                <input 
                  type="text" 
                  className="input"
                  defaultValue={components.find(c => c.id === selectedComponent)?.name}
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted mb-2">Configuration</label>
                <textarea 
                  className="input min-h-32"
                  placeholder="Component configuration (JSON)"
                />
              </div>

              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
                Remove Component
              </button>
            </div>
          ) : (
            <div className="text-center text-muted py-8">
              Select a component to view its properties
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function ComponentLibraryItem({ component }: { component: any }) {
  return (
    <div className="card p-3 cursor-move hover:border-accent transition-all">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{component.icon}</span>
        <span className="text-sm font-medium">{component.name}</span>
      </div>
    </div>
  );
}

function WorkflowNode({ component, selected, onClick }: { 
  component: Component; 
  selected: boolean;
  onClick: () => void;
}) {
  const getNodeStyle = () => {
    switch (component.type) {
      case 'start':
        return 'bg-accent/20 border-accent';
      case 'end':
        return 'bg-accent/20 border-accent';
      case 'ai-model':
        return 'bg-card border-border';
      case 'action':
        return 'bg-card border-border';
      case 'logic':
        return 'bg-card border-border';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div
      className={`absolute card p-4 cursor-pointer transition-all ${getNodeStyle()} ${
        selected ? 'ring-2 ring-accent' : ''
      }`}
      style={{ left: component.x, top: component.y }}
      onClick={onClick}
    >
      <div className="font-semibold text-sm">{component.name}</div>
      {component.type !== 'start' && component.type !== 'end' && (
        <div className="text-xs text-muted mt-1">{component.type}</div>
      )}
    </div>
  );
}
