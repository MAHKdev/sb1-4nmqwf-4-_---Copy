export interface StripePlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  priceId: string;
  popular?: boolean;
}

export const STRIPE_PLANS: Record<string, StripePlan> = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '1 child profile',
      'Basic chore management',
      'Basic reward system',
      'Activity tracking',
    ],
    priceId: '',
  },
  MONTHLY: {
    id: 'monthly',
    name: 'Monthly',
    price: 4.99,
    interval: 'month',
    features: [
      'Unlimited child profiles',
      'Advanced chore management',
      'Custom rewards',
      'Growth tracking',
      'Detailed analytics',
      'Priority support',
    ],
    priceId: 'price_monthly',
    popular: true,
  },
  HALF_YEARLY: {
    id: 'half-yearly',
    name: '6 Months',
    price: 24.99,
    interval: 'year',
    features: [
      'Everything in Monthly',
      '2 months free',
      'Family calendar',
      'Export data',
    ],
    priceId: 'price_half_yearly',
  },
  YEARLY: {
    id: 'yearly',
    name: 'Yearly',
    price: 39.99,
    interval: 'year',
    features: [
      'Everything in 6 Months',
      '5 months free',
      'API access',
      'Premium support',
    ],
    priceId: 'price_yearly',
  },
} as const;