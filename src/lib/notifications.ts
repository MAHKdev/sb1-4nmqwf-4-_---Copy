import { sendEmail } from './mailgun';
import { sendPushNotification } from './push';
import { NotificationEvent } from '@/types/notifications';
import { emailTemplates } from '@/config/emailTemplates';

interface SendNotificationParams {
  userId: string;
  email: string;
  eventType: NotificationEvent;
  data?: Record<string, any>;
  pushEnabled?: boolean;
}

export async function sendNotification({
  userId,
  email,
  eventType,
  data = {},
  pushEnabled = true,
}: SendNotificationParams) {
  const template = emailTemplates[eventType];
  
  if (!template) {
    throw new Error(`No template found for event type: ${eventType}`);
  }

  const { subject, text, html } = template(data);

  // Send email notification
  await sendEmail({
    to: email,
    subject,
    text,
    html,
    eventType,
    userId,
  });

  // Send push notification if enabled
  if (pushEnabled) {
    await sendPushNotification({
      userId,
      title: subject,
      body: text,
      data: {
        eventType,
        ...data,
      },
    });
  }
}