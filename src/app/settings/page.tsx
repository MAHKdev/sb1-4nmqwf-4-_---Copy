'use client';

import { useSession } from 'next-auth/react';
import { Settings, CreditCard, Shield, Database, Bell } from 'lucide-react';
import Link from 'next/link';
import { STRIPE_PLANS } from '@/config/stripe';

export default function SettingsPage() {
  const { data: session } = useSession();

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error accessing billing portal:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="grid gap-6">
        {/* Account Section */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">
              <Shield className="w-5 h-5" />
              Account
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{session?.user?.name}</p>
                  <p className="text-sm opacity-70">{session?.user?.email}</p>
                </div>
                <button className="btn btn-outline btn-sm">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">
              <CreditCard className="w-5 h-5" />
              Subscription
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-sm opacity-70">Free Plan</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/pricing" className="btn btn-primary btn-sm">
                    Upgrade
                  </Link>
                  <button
                    onClick={handleManageSubscription}
                    className="btn btn-outline btn-sm"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">
              <Database className="w-5 h-5" />
              Data Management
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm opacity-70">Download all your data</p>
                </div>
                <button className="btn btn-outline btn-sm">
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Email Notifications</span>
                  <input type="checkbox" className="toggle" />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Push Notifications</span>
                  <input type="checkbox" className="toggle" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}