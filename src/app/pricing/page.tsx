'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Check, X, Crown } from 'lucide-react';
import { STRIPE_PLANS } from '@/config/stripe';
import { LoginModal } from '@/components/auth/LoginModal';
import { motion } from 'framer-motion';

export default function PricingPage() {
  const { data: session } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      setShowLoginModal(true);
      return;
    }

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg opacity-70 mb-8">Choose the plan that works best for your family</p>
        
        <div className="flex items-center justify-center gap-4">
          <span className={!isYearly ? 'font-bold' : 'opacity-70'}>Monthly</span>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              checked={isYearly}
              onChange={(e) => setIsYearly(e.target.checked)}
            />
            <div className="swap-on">🌙</div>
            <div className="swap-off">🌞</div>
          </label>
          <span className={isYearly ? 'font-bold' : 'opacity-70'}>Yearly</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.values(STRIPE_PLANS).map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card bg-base-200 relative ${
              plan.popular ? 'border-2 border-primary' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="badge badge-primary gap-1">
                  <Crown className="w-4 h-4" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="card-body">
              <h2 className="card-title text-2xl">{plan.name}</h2>
              <div className="my-4">
                <span className="text-4xl font-bold">
                  ${plan.price}
                </span>
                {plan.price > 0 && (
                  <span className="text-sm opacity-70">
                    /{plan.interval}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="card-actions justify-end mt-auto">
                <button
                  onClick={() => handleSubscribe(plan.priceId)}
                  className={`btn btn-block ${
                    plan.popular ? 'btn-primary' : 'btn-outline'
                  }`}
                  disabled={!plan.priceId}
                >
                  {plan.price === 0 ? 'Get Started' : 'Subscribe'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}