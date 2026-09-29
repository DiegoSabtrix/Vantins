# Trucking call-request landing

Public route: `/trucking/registro`. It is intentionally absent from the Services navigation.
The form calls `/api/trucking/registro`; the server posts to HighLevel using the secret
`GHL_TRUCKING_WEBHOOK_URL`. The webhook URL must stay server-only in both Railway and
Sites. Only HTTPS `services.leadconnectorhq.com/hooks/...` is accepted.

## Form and validation

Required: stage, name, phone, state (FL or TX, matching the licensed states shown on
Vantins), plus explicit permission to call about this request. Coverages and truck
range are optional. Multiple coverages can be selected, except `not_sure`, which
is exclusive. General Freight is cargo, not a coverage. No dates, email, VIN,
documents, or promotional SMS permission are collected here.

## Webhook payload

The inbound workflow receives:

- Contact: `name`, `first_name`, `last_name`, `phone`, `state`.
- Stage: `operation_status` (`starting`, `renewing`, `adding`) and `stage`
  (`New Venture`, `Renovación`, `Agregar camiones`).
- `coverage_interests`: an array of selected labels; `coverage_interests_text`:
  the same labels joined by commas for HighLevel custom-field mapping. The
  `No estoy seguro` label remains unchanged.
- `truck_count_range`: selected label or empty string.
- `lead_status`: `Nuevo registro — llamar`.
- `internal_notification_line`: name | phone | state | stage | truck range |
  selected coverages, using `Sin indicar` for optional blanks.
- `source`, `submitted_at`, `utm_source`, `utm_medium`, `utm_campaign`,
  `utm_content`, `utm_term`, `utm_segment`.
- `consent_to_call_about_request: true` and `marketing_sms_consent: false`.

## HighLevel workflow actions

In the inbound webhook workflow, map the contact fields, create or update the
contact, map `coverage_interests_text` to a multiselect custom field whose
options exactly match the labels above, create an opportunity with status
`Nuevo registro — llamar`, assign it to the commercial owner, create a call
task, and send `internal_notification_line` in the internal alert. Give
`stage = Renovación` priority. The webhook bridge sends data; these actions
must be configured in the receiving HighLevel workflow. Do not enroll this
contact in promotional SMS/WhatsApp without separate permission.

## Verification

First run the local route with a mocked outbound `fetch` to test validation,
exclusive coverage selection, optional fields, and payload mapping. Then send
one clearly marked synthetic test lead through the public form and inspect the
HighLevel contact, opportunity, custom fields, assignment, task, and alert.
The webhook's HTTP success alone does not prove these downstream actions.
