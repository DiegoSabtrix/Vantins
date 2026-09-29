# Trucking registration landing

Public route: `/trucking/registro`. It is intentionally absent from the navigation menu.
The form calls `/api/trucking/registro`; only the server posts to HighLevel.

## Runtime setting

Set `GHL_TRUCKING_WEBHOOK_URL` as a secret in both the production server and
Sites runtime. Never put the URL in a `NEXT_PUBLIC_` variable or client code.
The route accepts only an HTTPS `services.leadconnectorhq.com/hooks/...` URL.

## HighLevel inbound workflow

The webhook receives JSON with:

- Contact: `name`, `first_name`, `last_name`, `email`, `phone`, `state`
- Operation: `operation_status` (`starting`, `renewing`, `adding`),
  `truck_count`, `primary_cargo`, `coverage_timing`
- Conditional dates: `renewal_expiration_date` or `estimated_start_date`
- Follow-up: `preferred_contact_method` (`phone` or `email`),
  `consent_to_contact_about_request: true`, `marketing_sms_consent: false`
- Attribution: `source`, `submitted_at`, `utm_source`, `utm_medium`,
  `utm_campaign`, `utm_content`

In the receiving HighLevel workflow, map the contact fields, create/update
the lead, assign the commercial owner, create a call task, and send an
internal notification. Branch follow-up on `preferred_contact_method`.
The form's contact authorization covers this request only; do not enroll
these leads in promotional SMS or WhatsApp without a separately recorded
channel-specific permission. The webhook alone cannot configure those
HighLevel workflow actions.

## Verification

The route returns success only after the webhook responds successfully.
It validates required fields and conditional dates, rejects oversize input,
and uses a hidden bot field. The browser disables repeat submission while
the request is in flight. Test the form with an authorized test contact in
HighLevel and confirm the lead, assignment, task, and internal alert before
using it for a campaign. No live CRM lead is created by the local mock test.
