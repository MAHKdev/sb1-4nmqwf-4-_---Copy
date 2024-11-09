import { supabase } from './supabase';
import { NotificationStatus } from '@/types/notifications';

interface SendPushParams {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, any>;
}

export async function sendPushNotification({
  userId,
  title,
  body,
  data = {},
}: SendPushParams) {
  try {
    // Get user's push tokens
    const { data: tokens, error } = await supabase
      .from('push_tokens')
      .select('token')
      .eq('user_id', userId);

    if (error) throw error;

    // Send to all registered devices
    const promises = tokens.map(async ({ token }) => {
      try {
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `key=${process.env.FIREBASE_SERVER_KEY}`,
          },
          body: JSON.stringify({
            to: token,
            notification: {
              title,
              body,
            },
            data,
          }),
        });

        const result = await response.json();

        // Log successful push notification
        await supabase.from('notification_logs').insert({
          user_id: userId,
          event_type: data.eventType,
          channel: 'push',
          status: 'delivered' as NotificationStatus,
          provider_response: result,
          recipient: token,
        });

        return result;
      } catch (error) {
        // Log failed push notification
        await supabase.from('notification_logs').insert({
          user_id: userId,
          event_type: data.eventType,
          channel: 'push',
          status: 'failed' as NotificationStatus,
          error_message: error instanceof Error ? error.message : 'Unknown error',
          recipient: token,
        });

        throw error;
      }
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Push notification error:', error);
    throw error;
  }
}