import { useEffect, useState } from 'react';
import {
  PushNotifications,
  PushNotificationSchema,
  Token,
  ActionPerformed,
} from '@capacitor/push-notifications';
import { supabase } from '@/lib/supabase';
import { useSession } from 'next-auth/react';

export function usePushNotifications() {
  const { data: session } = useSession();
  const [pushToken, setPushToken] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) return;

    const registerPush = async () => {
      try {
        // Request permission
        const permission = await PushNotifications.requestPermissions();
        if (permission.receive !== 'granted') return;

        // Register with system
        await PushNotifications.register();

        // Add listeners
        PushNotifications.addListener('registration', async (token: Token) => {
          setPushToken(token.value);

          // Save token to database
          await supabase.from('push_tokens').upsert({
            user_id: session.user.id,
            token: token.value,
            created_at: new Date().toISOString(),
          });
        });

        PushNotifications.addListener(
          'pushNotificationReceived',
          (notification: PushNotificationSchema) => {
            console.log('Push notification received:', notification);
          }
        );

        PushNotifications.addListener(
          'pushNotificationActionPerformed',
          (action: ActionPerformed) => {
            console.log('Push notification action performed:', action);
          }
        );
      } catch (error) {
        console.error('Push notification setup error:', error);
      }
    };

    registerPush();

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, [session?.user]);

  return { pushToken };
}