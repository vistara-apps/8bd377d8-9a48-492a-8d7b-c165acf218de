'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Plus, Play, Settings2, Trash2, Copy } from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'deployed';
  lastModified: string;
  runs: number;
}

export default function Dashboard() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Customer Support Agent',
      description: 'Automated customer inquiry handler with sentiment analysis',
      status: 'deployed',
      lastModified: '2 hours ago',
      runs: 1247
    },
    {
      id: '2',
      name: 'Content Summarizer',
      description: 'Extract key insights from long-form content',
      status: 'draft',
      lastModified: '1 day ago',
      runs: 0
    },
    {
      id: '3',
      name: 'Data Extraction Pipeline',
      description: 'Extract structured data from unstructured text',
      status: 'deployed',
      lastModified: '3 days ago',
      runs: 523
    }
  ]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">Open Agent Builder</span>
            </Link>
            <div className="flex gap-4">
              <Link href="/pricing" className="btn-secondary">
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Agents</h1>
            <p className="text-muted">Build, test, and deploy AI agent workflows</p>
          </div>
          <Link href="/designer" className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Agent
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Agents"
            value={workflows.length.toString()}
            change="+2 this week"
          />
          <StatCard
            label="Active Agents"
            value={workflows.filter(w => w.status === 'deployed').length.toString()}
            change="67% deployed"
          />
          <StatCard
            label="Total Runs"
            value={workflows.reduce((sum, w) => sum + w.runs, 0).toLocaleString()}
            change="+15% this month"
          />
        </div>

        {/* Workflows List */}
        <div className="space-y-4">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>

        {/* Empty State */}
        {workflows.length === 0 && (
          <div className="card text-center py-16">
            <Sparkles className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No agents yet</h3>
            <p className="text-muted mb-6">Create your first AI agent workflow to get started</p>
            <Link href="/designer" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Your First Agent
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="card">
      <div className="text-muted text-sm mb-1">{label}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-accent text-sm">{change}</div>
    </div>
  );
}

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold">{workflow.name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              workflow.status === 'deployed' 
                ? 'bg-accent/20 text-accent' 
                : 'bg-muted/20 text-muted'
            }`}>
              {workflow.status}
            </span>
          </div>
          <p className="text-muted mb-3">{workflow.description}</p>
          <div className="flex gap-6 text-sm text-muted">
            <span>Modified {workflow.lastModified}</span>
            <span>{workflow.runs.toLocaleString()} runs</span>
          </div>
        </div>
        
        <div className="flex md:flex-col gap-2">
          <Link 
            href={`/designer/${workflow.id}`}
            className="btn-secondary flex items-center gap-2 justify-center"
          >
            <Settings2 className="w-4 h-4" />
            Edit
          </Link>
          <Link 
            href={`/test/${workflow.id}`}
            className="btn-primary flex items-center gap-2 justify-center"
          >
            <Play className="w-4 h-4" />
            Test
          </Link>
        </div>
      </div>
    </div>
  );
}
