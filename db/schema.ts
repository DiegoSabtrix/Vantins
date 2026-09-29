import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(),
  requestId: text('request_id').notNull(),
  stripeIntentId: text('stripe_intent_id'),
  reference: text('reference').notNull(),
  paymentType: text('payment_type').notNull(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  notes: text('notes'),
  amountCents: integer('amount_cents').notNull(),
  feeCents: integer('fee_cents').notNull().default(0),
  totalCents: integer('total_cents').notNull(),
  status: text('status').notNull().default('creating'),
  consentAt: text('consent_at').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
}, (table) => [
  uniqueIndex('idx_payments_request_id').on(table.requestId),
  uniqueIndex('idx_payments_stripe_intent_id').on(table.stripeIntentId),
]);

export const stripeEvents = sqliteTable('stripe_events', {
  id: text('id').primaryKey(),
  paymentId: text('payment_id').notNull(),
  type: text('type').notNull(),
  receivedAt: text('received_at').notNull(),
});

export const paymentNotifications = sqliteTable('payment_notifications', {
  id: text('id').primaryKey(),
  paymentId: text('payment_id').notNull(),
  kind: text('kind').notNull(),
  recipient: text('recipient').notNull(),
  providerId: text('provider_id'),
  sentAt: text('sent_at'),
}, (table) => [uniqueIndex('idx_payment_notifications_key').on(table.paymentId, table.kind, table.recipient)]);
