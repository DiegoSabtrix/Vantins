# Website lead webhook

All website lead forms use the same server-only `GHL_TRUCKING_WEBHOOK_URL` secret in Sites and Railway. The browser posts to Vantins API routes; the webhook URL is never exposed to visitors. Payment checkout uses Stripe's separate payment and webhook flow.

| Form | Page | `form_source` |
| --- | --- | --- |
| Trucking call request | `/trucking/registro` | `trucking_call_request` |
| Commercial truck quote | `/get-quote` | `get_quote_truck` |
| Health quote | `/get-quote` | `get_quote_health` |
| Life quote | `/get-quote` | `get_quote_life` |
| Truck Services consultation | `/truck-services` | `truck_services_consultation` |

Every payload includes `source`, `page_source`, `origin_page`, `form_source`, `form_type`, `submitted_at`, and `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_segment`. The API sets page and form origin from its own allowlist, so a visitor cannot relabel one form as another page. It also sends name, phone, email when collected, state, form-specific answers, request-only contact consent, and `marketing_sms_consent: false`. The trucking landing retains its existing webhook payload fields.

In HighLevel, map `form_source` and `page_source` to custom fields, then branch the inbound webhook workflow by `form_source` for the appropriate commercial pipeline, opportunity owner, call task, and internal notice. Map each form-specific field as needed. A successful webhook response means the Vantins server delivered the payload; inspect the contact and opportunity in HighLevel to confirm the workflow actions and field mapping.

Test submissions should use a clearly named QA lead and a reserved 555 number. Do not enroll these contacts in promotional SMS without separate consent.
