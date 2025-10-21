import Link from 'next/link';
import { Sparkles, Check } from 'lucide-react';

export default function Pricing() {
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
            <Link href="/dashboard" className="btn-primary">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Plan */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-accent">$15</span>
                <span className="text-muted">/month</span>
              </div>
              <p className="text-muted mb-6">Perfect for getting started with AI agents</p>
              
              <ul className="space-y-3 mb-8">
                <Feature text="5 Active Agents" />
                <Feature text="Visual Workflow Designer" />
                <Feature text="Pre-built Components" />
                <Feature text="Live Testing Environment" />
                <Feature text="Community Support" />
                <Feature text="Basic Analytics" />
              </ul>

              <button className="btn-secondary w-full">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="card border-accent border-2">
              <div className="text-accent text-sm font-bold mb-2">MOST POPULAR</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-accent">$49</span>
                <span className="text-muted">/month</span>
              </div>
              <p className="text-muted mb-6">For power users building production agents</p>
              
              <ul className="space-y-3 mb-8">
                <Feature text="Unlimited Agents" />
                <Feature text="Advanced Integrations" />
                <Feature text="Priority Support" />
                <Feature text="Custom Components" />
                <Feature text="Team Collaboration" />
                <Feature text="Advanced Analytics" />
                <Feature text="API Access" />
                <Feature text="White-label Options" />
              </ul>

              <button className="btn-primary w-full">
                Get Started
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6 max-w-3xl mx-auto">
              <FAQItem
                question="Can I change plans later?"
                answer="Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
              />
              <FAQItem
                question="What happens if I exceed my agent limit?"
                answer="On the Basic plan, you'll need to upgrade to Pro or deactivate some agents. Pro plan has unlimited agents."
              />
              <FAQItem
                question="Do you offer refunds?"
                answer="We offer a 14-day money-back guarantee. If you're not satisfied, contact support for a full refund."
              />
              <FAQItem
                question="Can I cancel anytime?"
                answer="Yes, you can cancel your subscription at any time. Your access continues until the end of your billing period."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <Check className="w-5 h-5 text-accent flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="card">
      <h3 className="font-bold mb-2">{question}</h3>
      <p className="text-muted">{answer}</p>
    </div>
  );
}
