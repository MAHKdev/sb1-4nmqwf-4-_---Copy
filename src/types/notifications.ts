export type NotificationEvent =
  | 'welcome'
  | 'password_reset'
  | 'email_verification'
  | 'task_completed'
  | 'task_reminder'
  | 'reward_earned'
  | 'penalty_received'
  | 'streak_milestone'
  | 'growth_reminder'
  | 'subscription_renewed'
  | 'subscription_expired'
  | 'subscription_payment_failed';

export type NotificationStatus = 'delivered' | 'failed' | 'pending';

export type NotificationChannel = 'email' | 'push';

export interface NotificationLog {
  id: string;
  user_id: string;
  event_type: NotificationEvent;
  channel: NotificationChannel;
  status: NotificationStatus;
  provider_response?: any;
  error_message?: string;
  recipient: string;
  created_at: string;
}