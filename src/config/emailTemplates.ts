import { format } from 'date-fns';
import { NotificationEvent } from '@/types/notifications';

type TemplateFunction = (data: Record<string, any>) => {
  subject: string;
  text: string;
  html: string;
};

export const emailTemplates: Record<NotificationEvent, TemplateFunction> = {
  welcome: (data) => ({
    subject: 'Welcome to KidsReward! 🎉',
    text: `Hi ${data.name}!\n\nWelcome to KidsReward. We're excited to help you manage your children's rewards and growth.\n\nGet started by adding your first child profile.`,
    html: `
      <h1>Welcome to KidsReward! 🎉</h1>
      <p>Hi ${data.name}!</p>
      <p>Welcome to KidsReward. We're excited to help you manage your children's rewards and growth.</p>
      <p>Get started by adding your first child profile.</p>
    `,
  }),

  password_reset: (data) => ({
    subject: 'Reset Your KidsReward Password',
    text: `Hi ${data.name},\n\nWe received a request to reset your password. Click the link below to create a new password:\n\n${data.resetLink}\n\nIf you didn't request this, you can safely ignore this email.`,
    html: `
      <h1>Reset Your Password</h1>
      <p>Hi ${data.name},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <a href="${data.resetLink}" style="background-color: #4C8BF5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  }),

  task_completed: (data) => ({
    subject: `${data.childName} Completed a Task! 🌟`,
    text: `Great news! ${data.childName} has completed "${data.taskName}" and earned ${data.points} points.`,
    html: `
      <h1>Task Completed! 🌟</h1>
      <p>Great news! ${data.childName} has completed "${data.taskName}" and earned ${data.points} points.</p>
    `,
  }),

  reward_earned: (data) => ({
    subject: `${data.childName} Earned a Reward! 🎁`,
    text: `Congratulations! ${data.childName} has earned "${data.rewardName}" by spending ${data.points} points.`,
    html: `
      <h1>Reward Earned! 🎁</h1>
      <p>Congratulations! ${data.childName} has earned "${data.rewardName}" by spending ${data.points} points.</p>
    `,
  }),

  streak_milestone: (data) => ({
    subject: `Amazing Streak Achievement! 🔥`,
    text: `Incredible! ${data.childName} has maintained a ${data.days}-day streak! Current multiplier: ${data.multiplier}x`,
    html: `
      <h1>Amazing Streak Achievement! 🔥</h1>
      <p>Incredible! ${data.childName} has maintained a ${data.days}-day streak!</p>
      <p>Current multiplier: ${data.multiplier}x</p>
    `,
  }),

  growth_reminder: (data) => ({
    subject: 'Time for a Growth Measurement 📏',
    text: `It's been ${data.daysSinceLastMeasurement} days since ${data.childName}'s last measurement. Schedule a new measurement to track their growth progress.`,
    html: `
      <h1>Time for a Growth Measurement 📏</h1>
      <p>It's been ${data.daysSinceLastMeasurement} days since ${data.childName}'s last measurement.</p>
      <p>Schedule a new measurement to track their growth progress.</p>
    `,
  }),

  subscription_renewed: (data) => ({
    subject: 'Subscription Successfully Renewed ✨',
    text: `Your ${data.planName} subscription has been renewed. Next billing date: ${format(new Date(data.nextBillingDate), 'PPP')}.`,
    html: `
      <h1>Subscription Successfully Renewed ✨</h1>
      <p>Your ${data.planName} subscription has been renewed.</p>
      <p>Next billing date: ${format(new Date(data.nextBillingDate), 'PPP')}.</p>
    `,
  }),

  subscription_expired: (data) => ({
    subject: 'Your Subscription Has Expired',
    text: `Your ${data.planName} subscription has expired. Renew now to continue enjoying premium features.`,
    html: `
      <h1>Your Subscription Has Expired</h1>
      <p>Your ${data.planName} subscription has expired.</p>
      <p>Renew now to continue enjoying premium features.</p>
      <a href="${data.renewLink}" style="background-color: #4C8BF5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Renew Subscription</a>
    `,
  }),

  subscription_payment_failed: (data) => ({
    subject: 'Subscription Payment Failed',
    text: `We couldn't process your subscription payment. Please update your payment method to continue using premium features.`,
    html: `
      <h1>Subscription Payment Failed</h1>
      <p>We couldn't process your subscription payment.</p>
      <p>Please update your payment method to continue using premium features.</p>
      <a href="${data.updatePaymentLink}" style="background-color: #4C8BF5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Update Payment Method</a>
    `,
  }),

  email_verification: (data) => ({
    subject: 'Verify Your Email Address',
    text: `Please verify your email address by clicking the link below:\n\n${data.verificationLink}`,
    html: `
      <h1>Verify Your Email Address</h1>
      <p>Please verify your email address by clicking the button below:</p>
      <a href="${data.verificationLink}" style="background-color: #4C8BF5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Verify Email</a>
    `,
  }),

  task_reminder: (data) => ({
    subject: `Reminder: Tasks Due Today`,
    text: `Don't forget! ${data.childName} has ${data.taskCount} tasks due today.`,
    html: `
      <h1>Reminder: Tasks Due Today</h1>
      <p>Don't forget! ${data.childName} has ${data.taskCount} tasks due today.</p>
    `,
  }),

  penalty_received: (data) => ({
    subject: `Penalty Applied to ${data.childName}`,
    text: `A penalty has been applied to ${data.childName} for "${data.reason}". Points deducted: ${data.points}`,
    html: `
      <h1>Penalty Applied</h1>
      <p>A penalty has been applied to ${data.childName} for "${data.reason}".</p>
      <p>Points deducted: ${data.points}</p>
    `,
  }),
};