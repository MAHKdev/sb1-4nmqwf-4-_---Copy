import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { NotificationEvent, NotificationStatus } from '@/types/notifications';
import { supabase } from './supabase';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
  url: 'https://api.mailgun.net',
});

const DOMAIN = process.env.MAILGUN_DOMAIN || '';
const FROM_EMAIL = `KidsReward <noreply@${DOMAIN}>`;

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
  eventType: NotificationEvent;
  userId: string;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  eventType,
  userId,
}: SendEmailParams) {
  try {
    const result = await mg.messages.create(DOMAIN, {
      from: FROM_EMAIL,
      to: [to],
      subject,
      text,
      html,
    });

    // Log notification event
    await supabase.from('notification_logs').insert({
      user_id: userId,
      event_type: eventType,
      channel: 'email',
      status: 'delivered' as NotificationStatus,
      provider_response: result,
      recipient: to,
    });

    return result;
  } catch (error) {
    console.error('Mailgun error:', error);

    // Log failed notification
    await supabase.from('notification_logs').insert({
      user_id: userId,
      event_type: eventType,
      channel: 'email',
      status: 'failed' as NotificationStatus,
      error_message: error instanceof Error ? error.message : 'Unknown error',
      recipient: to,
    });

    throw error;
  }
}