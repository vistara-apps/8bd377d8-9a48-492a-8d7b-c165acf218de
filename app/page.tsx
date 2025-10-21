import Link from 'next/link';
import { Sparkles, Zap, Shield, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent"></div>
        
        <nav className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">Open Agent Builder</span>
            </div>
            <div className="flex gap-4">
              <Link href="/dashboard" className="btn-secondary">
                Dashboard
              </Link>
              <Link href="/pricing" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent">
              Build AI Agents Visually
            </h1>
            <p className="text-xl md:text-2xl text-muted mb-8">
              Design, test, and deploy powerful AI agent workflows without writing a single line of code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="btn-primary text-lg">
                Start Building Free
              </Link>
              <Link href="#features" className="btn-secondary text-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Everything You Need to Build AI Agents
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-12 h-12 text-accent" />}
              title="Visual Designer"
              description="Drag-and-drop interface for building complex AI workflows intuitively."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-accent" />}
              title="Pre-built Components"
              description="Ready-to-use integrations with OpenAI, Claude, and popular AI models."
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-accent" />}
              title="Live Testing"
              description="Debug and test your agents in real-time before deployment."
            />
            <FeatureCard
              icon={<Rocket className="w-12 h-12 text-accent" />}
              title="One-Click Deploy"
              description="Launch your AI agents to production with a single click."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            From Idea to Production in Minutes
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-12">
            <Step
              number="1"
              title="Design Your Workflow"
              description="Use our visual designer to connect AI models, actions, and logic blocks. No coding required."
            />
            <Step
              number="2"
              title="Test & Debug"
              description="Run your agent in our sandbox environment. See execution paths and outputs in real-time."
            />
            <Step
              number="3"
              title="Deploy & Monitor"
              description="Launch your agent with one click. Monitor performance and iterate quickly."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Simple, Transparent Pricing
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
              name="Basic"
              price="$15"
              features={[
                "5 Active Agents",
                "Visual Workflow Designer",
                "Pre-built Components",
                "Live Testing Environment",
                "Community Support"
              ]}
            />
            <PricingCard
              name="Pro"
              price="$49"
              features={[
                "Unlimited Agents",
                "Advanced Integrations",
                "Priority Support",
                "Custom Components",
                "Team Collaboration",
                "Advanced Analytics"
              ]}
              highlighted
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center card">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Build Your First AI Agent?
            </h2>
            <p className="text-xl text-muted mb-8">
              Join thousands of builders creating powerful AI workflows without code.
            </p>
            <Link href="/dashboard" className="btn-primary text-lg">
              Start Building Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="font-bold">Open Agent Builder</span>
            </div>
            <div className="flex gap-6 text-muted">
              <Link href="/docs" className="hover:text-accent transition-colors">Docs</Link>
              <Link href="/pricing" className="hover:text-accent transition-colors">Pricing</Link>
              <Link href="/support" className="hover:text-accent transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-bg flex items-center justify-center font-bold text-xl">
        {number}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted text-lg">{description}</p>
      </div>
    </div>
  );
}

function PricingCard({ name, price, features, highlighted = false }: { 
  name: string; 
  price: string; 
  features: string[]; 
  highlighted?: boolean 
}) {
  return (
    <div className={`card ${highlighted ? 'border-accent border-2' : ''}`}>
      {highlighted && (
        <div className="text-accent text-sm font-bold mb-2">MOST POPULAR</div>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-5xl font-bold text-accent">{price}</span>
        <span className="text-muted">/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={highlighted ? 'btn-primary w-full' : 'btn-secondary w-full'}>
        Get Started
      </button>
    </div>
  );
}
