'use client';

import { useState, useEffect } from 'react';
import { Bell, Mail, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSession } from 'next-auth/react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  task_reminders: boolean;
  growth_reminders: boolean;
  streak_updates: boolean;
  subscription_updates: boolean;
}

export function NotificationSettings() {
  const { data: session } = useSession();
  const { pushToken } = usePushNotifications();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_notifications: true,
    push_notifications: true,
    task_reminders: true,
    growth_reminders: true,
    streak_updates: true,
    subscription_updates: true,
  });

  useEffect(() => {
    if (!session?.user) return;

    // Load user preferences
    const loadPreferences = async () => {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Error loading preferences:', error);
        return;
      }

      if (data) {
        setPreferences(data);
      }
    };

    loadPreferences();
  }, [session?.user]);

  const updatePreference = async (key: keyof NotificationPreferences) => {
    if (!session?.user) return;

    const newPreferences = {
      ...preferences,
      [key]: !preferences[key],
    };

    setPreferences(newPreferences);

    try {
      await supabase
        .from('notification_preferences')
        .upsert({
          user_id: session.user.id,
          ...newPreferences,
          updated_at: new Date().toISOString(),
        });
    } catch (error) {
      console.error('Error updating preferences:', error);
      // Revert on error
      setPreferences(preferences);
    }
  };

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">
          <Bell className="w-5 h-5" />
          Notification Settings
        </h2>

        <div className="divider">Channels</div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm opacity-70">Receive updates via email</p>
              </div>
            </div>
            <input
              type="checkbox"
              className="toggle"
              checked={preferences.email_notifications}
              onChange={() => updatePreference('email_notifications')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm opacity-70">
                  {pushToken ? 'Receive mobile notifications' : 'Enable notifications in your browser'}
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="toggle"
              checked={preferences.push_notifications}
              onChange={() => updatePreference('push_notifications')}
            />
          </div>
        </div>

        <div className="divider">Notification Types</div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Task Reminders</p>
              <p className="text-sm opacity-70">Daily task notifications</p>
            </div>
            <input
              type="checkbox"
              className="toggle"
              checked={preferences.task_reminders}
              onChange={() => updatePreference('task_reminders')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Growth Reminders</p>
              <p className="text-sm opacity-70">Monthly measurement reminders</p>
            </div>
            <input
              type="checkbox"
              className="toggle"
              checked={preferences.growth_reminders}
              onChange={() => updatePreference('growth_reminders')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Streak Updates</p>
              <p className="text-sm opacity-70">Notifications about streak milestones</p>
            </div>
            <input
              type="checkbox"
              className="toggle"
              checked={preferences.streak_updates}
              onChange={() => updatePreference('streak_updates')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Subscription Updates</p>
              <p className="text-sm opacity-70">Billing and subscription notifications</p>
            </div>
            <input
              type="checkbox"
              className="toggle"
              checked={preferences.subscription_updates}
              onChange={() => updatePreference('subscription_updates')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}