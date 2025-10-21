'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Play, RotateCcw, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface TestRun {
  id: string;
  status: 'running' | 'success' | 'error';
  input: string;
  output?: string;
  duration?: number;
  steps: TestStep[];
}

interface TestStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  output?: string;
  duration?: number;
}

export default function TestPage() {
  const [input, setInput] = useState('');
  const [testRun, setTestRun] = useState<TestRun | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleTest = async () => {
    setIsRunning(true);
    
    // Simulate test execution
    const mockRun: TestRun = {
      id: Date.now().toString(),
      status: 'running',
      input,
      steps: [
        { id: '1', name: 'Start', status: 'success', duration: 10 },
        { id: '2', name: 'OpenAI GPT-4', status: 'running' },
        { id: '3', name: 'Send Email', status: 'pending' },
        { id: '4', name: 'End', status: 'pending' }
      ]
    };
    
    setTestRun(mockRun);

    // Simulate step-by-step execution
    setTimeout(() => {
      setTestRun(prev => prev ? {
        ...prev,
        steps: prev.steps.map((step, idx) => 
          idx === 1 ? { ...step, status: 'success', duration: 1250, output: 'Generated response: "Hello! How can I help you today?"' } : step
        )
      } : null);
    }, 1500);

    setTimeout(() => {
      setTestRun(prev => prev ? {
        ...prev,
        steps: prev.steps.map((step, idx) => 
          idx === 2 ? { ...step, status: 'running' } : step
        )
      } : null);
    }, 1600);

    setTimeout(() => {
      setTestRun(prev => prev ? {
        ...prev,
        status: 'success',
        output: 'Email sent successfully to user@example.com',
        duration: 2800,
        steps: prev.steps.map((step, idx) => 
          idx === 2 ? { ...step, status: 'success', duration: 450, output: 'Email sent to user@example.com' } :
          idx === 3 ? { ...step, status: 'success', duration: 5 } : step
        )
      } : null);
      setIsRunning(false);
    }, 2900);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">Test Environment</span>
            </Link>
            <Link href="/designer" className="btn-secondary">
              Back to Designer
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Test Your Agent</h1>
          <p className="text-muted mb-8">Run your agent with test input and see the execution flow in real-time</p>

          {/* Input Section */}
          <div className="card mb-6">
            <h3 className="font-bold mb-4">Test Input</h3>
            <textarea
              className="input min-h-32 mb-4"
              placeholder="Enter test input for your agent..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex gap-4">
              <button 
                className="btn-primary flex items-center gap-2"
                onClick={handleTest}
                disabled={isRunning || !input}
              >
                <Play className="w-5 h-5" />
                {isRunning ? 'Running...' : 'Run Test'}
              </button>
              <button 
                className="btn-secondary flex items-center gap-2"
                onClick={() => {
                  setInput('');
                  setTestRun(null);
                }}
                disabled={isRunning}
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          {/* Execution Flow */}
          {testRun && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Execution Flow</h3>
                <div className="flex items-center gap-2">
                  {testRun.status === 'running' && (
                    <span className="flex items-center gap-2 text-accent">
                      <Clock className="w-4 h-4 animate-spin" />
                      Running...
                    </span>
                  )}
                  {testRun.status === 'success' && (
                    <span className="flex items-center gap-2 text-accent">
                      <CheckCircle2 className="w-4 h-4" />
                      Completed in {testRun.duration}ms
                    </span>
                  )}
                  {testRun.status === 'error' && (
                    <span className="flex items-center gap-2 text-red-500">
                      <XCircle className="w-4 h-4" />
                      Failed
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {testRun.steps.map((step, index) => (
                  <div key={step.id}>
                    <TestStepCard step={step} />
                    {index < testRun.steps.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="w-0.5 h-8 bg-border"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {testRun.output && (
                <div className="mt-6 p-4 rounded bg-accent/10 border border-accent">
                  <div className="text-sm text-muted mb-2">Final Output</div>
                  <div className="font-mono text-sm">{testRun.output}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TestStepCard({ step }: { step: TestStep }) {
  const getStatusIcon = () => {
    switch (step.status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-accent" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-accent animate-spin" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-muted"></div>;
    }
  };

  return (
    <div className={`p-4 rounded border transition-all ${
      step.status === 'running' ? 'border-accent bg-accent/5' :
      step.status === 'success' ? 'border-border bg-card' :
      step.status === 'error' ? 'border-red-500 bg-red-500/5' :
      'border-border bg-card opacity-50'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <span className="font-semibold">{step.name}</span>
        </div>
        {step.duration && (
          <span className="text-sm text-muted">{step.duration}ms</span>
        )}
      </div>
      {step.output && (
        <div className="mt-2 p-3 rounded bg-bg/50 text-sm font-mono">
          {step.output}
        </div>
      )}
    </div>
  );
}
