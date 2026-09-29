const FORMS = {
  get_quote_truck: { page: '/get-quote', label: 'Commercial Truck Insurance' },
  get_quote_health: { page: '/get-quote', label: 'Health Insurance' },
  get_quote_life: { page: '/get-quote', label: 'Life Insurance' },
  truck_services_consultation: { page: '/truck-services', label: 'Truck Services Consultation' },
} as const;

type FormId = keyof typeof FORMS;
const json = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const clean = (value: unknown, max = 120) => typeof value === 'string' ? value.trim().slice(0, max + 1) : '';
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
const validPhone = (value: string) => /^\+?[\d\s().-]{10,30}$/.test(value) && value.replace(/\D/g, '').length >= 10;

export async function POST(request: Request) {
  let endpoint: URL;
  try {
    endpoint = new URL(process.env.GHL_TRUCKING_WEBHOOK_URL || '');
    if (endpoint.protocol !== 'https:' || endpoint.hostname !== 'services.leadconnectorhq.com' || !endpoint.pathname.startsWith('/hooks/')) throw new Error();
  } catch { return json({ error: 'El formulario no está disponible. Llámanos para recibir ayuda.' }, 503); }

  try {
    const raw = await request.text();
    if (raw.length > 8000) return json({ error: 'La solicitud es demasiado larga.' }, 413);
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ error: 'Revisa los datos del formulario.' }, 400);
    if (clean(data.website)) return json({ ok: true });
    const formId = clean(data.formId, 40) as FormId;
    if (!Object.prototype.hasOwnProperty.call(FORMS, formId)) return json({ error: 'Formulario no válido.' }, 400);
    const form = FORMS[formId];
    const name = clean(data.name, 100);
    const phone = clean(data.phone, 30);
    const email = clean(data.email, 254);
    const state = clean(data.state, 50).toUpperCase();
    if (name.length < 2 || name.length > 100 || !validPhone(phone) || !validEmail(email) || !state || state.length > 50 || data.contactConsent !== true) return json({ error: 'Revisa nombre, teléfono, correo, estado y autorización.' }, 400);
    if (formId !== 'truck_services_consultation' && !['FL', 'TX'].includes(state)) return json({ error: 'Selecciona un estado donde Vantins puede atenderte.' }, 400);

    const operationType = clean(data.operationType, 80);
    const fleetSize = clean(data.fleetSize, 40);
    const householdSize = clean(data.householdSize, 20);
    const coverageAmount = clean(data.coverageAmount, 40);
    const service = clean(data.service, 100);
    if ((formId === 'get_quote_truck' && (!operationType || !fleetSize)) ||
        (formId === 'get_quote_health' && !householdSize) ||
        (formId === 'get_quote_life' && !coverageAmount) ||
        (formId === 'truck_services_consultation' && !service)) return json({ error: 'Completa los datos obligatorios.' }, 400);

    const coverages = data.coverages;
    if (coverages !== undefined && (!Array.isArray(coverages) || coverages.length > 10 || coverages.some(v => typeof v !== 'string' || v.length > 60))) return json({ error: 'Revisa las coberturas.' }, 400);
    const utm = data.utm && typeof data.utm === 'object' && !Array.isArray(data.utm) ? data.utm as Record<string, unknown> : {};
    const [firstName, ...lastNames] = name.split(/\s+/);
    const coverageLabels = Array.isArray(coverages) ? [...new Set(coverages)] : [];
    const payload = {
      event: 'website_lead',
      source: `vantins.com${form.page}`,
      page_source: form.page,
      origin_page: `https://www.vantins.com${form.page}`,
      form_source: formId,
      form_type: form.label,
      lead_status: 'Nuevo registro — llamar',
      name, first_name: firstName, last_name: lastNames.join(' '), phone, email, state,
      company_name: clean(data.companyName, 100),
      operation_type: operationType,
      fleet_size: fleetSize,
      coverage_interests: coverageLabels,
      coverage_interests_text: coverageLabels.join(', '),
      household_size: householdSize,
      coverage_amount_desired: coverageAmount,
      preferred_contact_method: clean(data.contactMethod, 30),
      best_contact_time: clean(data.contactTime, 80),
      language_preference: clean(data.language, 20),
      company_exists: clean(data.companyExists, 30),
      has_usdot: clean(data.hasUsdot, 30),
      has_mc: clean(data.hasMc, 30),
      vehicle_count: clean(data.vehicleCount, 20),
      vehicle_type: clean(data.vehicleType, 80),
      service_requested: service,
      preferred_date_time: clean(data.preferredDateTime, 40),
      internal_notification_line: [name, phone, state, form.label, service || operationType || coverageAmount || householdSize].filter(Boolean).join(' | '),
      consent_to_contact_about_request: true,
      marketing_sms_consent: false,
      submitted_at: new Date().toISOString(),
      utm_source: clean(utm.source, 100), utm_medium: clean(utm.medium, 100), utm_campaign: clean(utm.campaign, 100),
      utm_content: clean(utm.content, 100), utm_term: clean(utm.term, 100), utm_segment: clean(utm.segment, 100),
    };
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload), cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(10000) });
    if (!response.ok) return json({ error: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o llámanos.' }, 502);
    return json({ ok: true });
  } catch { return json({ error: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o llámanos.' }, 502); }
}
