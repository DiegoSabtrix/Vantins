# Vantins payment setup

The page lives at `/payment` and is linked from Help & Support. Production is hosted on Railway at `https://www.vantins.com`. It remains unable to charge until **all** required runtime values are set and both activation flags are `true`. The current payment authorization and Terms of Payment are drafts for Vantins review. Do not enable live checkout without an approved authorization, a working webhook, and tested email delivery.

## Configuration

Set the variables listed in `.env.example` on the Railway Vantins service. Use a Railway reference to the existing Postgres service for `DATABASE_URL`. Keep the Stripe secret, webhook secret, link signing secret, database URL, and Resend key private. Do not commit them or expose them in client code. Use a Stripe test pair first, then replace both keys together with a rotated live pair. The key shared in conversation should be rotated in Stripe before live activation.

- `DATABASE_URL`: Railway Postgres private connection URL. Tables are created on the first payment database operation.

- `STRIPE_SECRET_KEY`: server-only key.
- `STRIPE_PUBLISHABLE_KEY`: public key, same test/live mode as the secret.
- `STRIPE_WEBHOOK_SECRET`: endpoint signing secret for `https://www.vantins.com/api/stripe/webhook`.
- `PAYMENT_LINK_SIGNING_SECRET`: random string of at least 32 characters, also used by the link generation script.
- `PAYMENT_MIN_CENTS`, `PAYMENT_MAX_CENTS`: server-enforced USD payment range; defaults are $0.50 and $100,000.
- `PAYMENT_PUBLIC_ORIGIN`: canonical HTTPS origin for Stripe's return URL.
- `RESEND_API_KEY`, `PAYMENT_FROM_EMAIL`, `PAYMENT_INTERNAL_EMAIL`: transactional email delivery. Verify the sender domain in Resend.
- `PAYMENT_CHECKOUT_ENABLED`, `PAYMENT_AUTHORIZATION_APPROVED`: set both to `true` **only after** review and tests.

Enable cards and **US bank account/ACH Direct Debit** in Stripe Payment Methods. Stripe decides which methods qualify for each amount and customer; the page does not claim ACH is always available. Configure a webhook destination for `payment_intent.processing`, `payment_intent.succeeded`, and `payment_intent.payment_failed`. Stripe's `receipt_email` is also set; review the Dashboard's receipt settings to avoid duplicate customer receipts with the custom confirmation email.

Railway uses PostgreSQL for the payment, event, and notification tables. The `drizzle/` SQLite migration remains for the separate Sites preview and is not used by Railway. GitHub Pages only publishes the static site and cannot run the payment API.

## Payment links

An ordinary link may include `?ref=...&type=...&amount=...` for editable prefill. A fixed-amount invoice link must be generated on a trusted computer or backend with the same signing secret:

```bash
node scripts/create-payment-link.mjs INV-1042 "Invoice Payment" 149.00 7
```

The last argument is the expiration in days. The output link includes a signed reference, type, amount and expiration. The server validates all four and refuses a changed amount; do not create signed links in browser code. Keep the signing secret out of URLs and GitHub.

## Test before enabling payments

1. Install/test the Stripe test keys and a **test** webhook secret. Enable test card and US bank account methods. Set up a verified sender and internal email. Keep the activation flags false while configuring; then set both true in the **test** environment.
2. On desktop and mobile, test required fields, email/phone formats, amount limits, signed link tampering/expiration, fee and total, consent, loading and double-click behavior.
3. Use Stripe test card **4242 4242 4242 4242** for success, **4000 0000 0000 9995** for a decline, and **4000 0025 0000 3155** for 3D Secure. Use any future expiry and CVC. Check the result page, payment record, webhook event deduplication, and one customer and one internal completed email.
4. For ACH, use Stripe's test Financial Connections flow or routing **110000000** and the test account numbers from [Stripe's current ACH guide](https://docs.stripe.com/payments/ach-direct-debit/accept-a-payment). Confirm `processing` stays pending, the processing email is sent, and a later success or failure webhook changes the status. Do not mark a pending ACH payment complete.
5. Retry the same webhook payload and confirm one event and no duplicate messages. Verify the invalid-signature case returns 400. Verify payment credentials never appear in application storage.
6. Review the Terms of Payment and authorization with Vantins, confirm the support and sender addresses, then rotate the exposed live key, set live keys and a **live** webhook secret, deploy the new runtime revision, and verify a small real payment.

No Stripe test credentials or webhook secret were supplied with this request, so the card and ACH end-to-end steps require those credentials before they can be executed. Do not enter a test card against the live keys.
