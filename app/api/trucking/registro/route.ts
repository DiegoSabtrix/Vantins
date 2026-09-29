const WEBHOOK_HOST = 'services.leadconnectorhq.com';
const STATES = new Set('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC'.split(' '));
const KINDS = new Set(['starting', 'renewing', 'adding']);
const TIMINGS = new Set(['asap', 'two_weeks', 'this_month', 'later']);
const CONTACTS = new Set(['phone', 'email']);
const json = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max + 1) : '';
}

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T00:00:00Z');
  return Number.isFinite(date.getTime()) && date.toISOString().startsWith(value);
}

export async function POST(request: Request) {
  const webhook = process.env.GHL_TRUCKING_WEBHOOK_URL;
  let endpoint: URL;
  try {
    endpoint = new URL(webhook || '');
    if (endpoint.protocol !== 'https:' || endpoint.hostname !== WEBHOOK_HOST || !endpoint.pathname.startsWith('/hooks/')) throw new Error();
  } catch {
    return json({ error: 'El registro no está disponible en este momento. Llámanos para recibir ayuda.' }, 503);
  }

  try {
    const raw = await request.text();
    if (raw.length > 6000) return json({ error: 'La solicitud es demasiado larga.' }, 413);
    let data: Record<string, unknown>;
    try { data = JSON.parse(raw) as Record<string, unknown>; }
    catch { return json({ error: 'Revisa los datos del formulario.' }, 400); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ error: 'Revisa los datos del formulario.' }, 400);
    // Quietly discard bot submissions from the hidden field.
    if (clean(data.website, 100)) return json({ ok: true });

    const name = clean(data.name, 100);
    const email = clean(data.email, 254).toLowerCase();
    const phone = clean(data.phone, 30);
    const state = clean(data.state, 2).toUpperCase();
    const kind = clean(data.kind, 20);
    const trucks = Number(data.trucks);
    const cargo = clean(data.cargo, 100);
    const timing = clean(data.timing, 20);
    const renewalDate = clean(data.renewalDate, 10);
    const startDate = clean(data.startDate, 10);
    const preferredContact = clean(data.preferredContact, 10);
    const contactConsent = data.contactConsent === true;
    if (
      name.length < 2 || name.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      !/^\+?[\d\s().-]{10,30}$/.test(phone) || phone.replace(/\D/g, '').length < 10 ||
      !STATES.has(state) || !KINDS.has(kind) ||
      !Number.isInteger(trucks) || trucks < 1 || trucks > 9999 ||
      cargo.length < 2 || cargo.length > 100 ||
      !TIMINGS.has(timing) || !CONTACTS.has(preferredContact) || !contactConsent ||
      (kind === 'renewing' && !validDate(renewalDate)) ||
      (kind === 'starting' && !validDate(startDate))
    ) return json({ error: 'Revisa los campos señalados e intenta nuevamente.' }, 400);

    const source = data.utm && typeof data.utm === 'object' && !Array.isArray(data.utm) ? data.utm as Record<string, unknown> : {};
    const [firstName, ...lastNames] = name.split(/\s+/);
    const payload = {
      event: 'trucking_insurance_registration',
      source: 'vantins.com/trucking/registro',
      name,
      first_name: firstName,
      last_name: lastNames.join(' '),
      email,
      phone,
      state,
      operation_state: state,
      operation_status: kind,
      truck_count: trucks,
      primary_cargo: cargo,
      coverage_timing: timing,
      renewal_expiration_date: kind === 'renewing' ? renewalDate : '',
      estimated_start_date: kind === 'starting' ? startDate : '',
      preferred_contact_method: preferredContact,
      consent_to_contact_about_request: true,
      marketing_sms_consent: false,
      submitted_at: new Date().toISOString(),
      utm_source: clean(source.source, 100),
      utm_medium: clean(source.medium, 100),
      utm_campaign: clean(source.campaign, 100),
      utm_content: clean(source.content, 100),
    };
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return json({ error: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o llámanos.' }, 502);
    return json({ ok: true });
  } catch {
    return json({ error: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o llámanos.' }, 502);
  }
}
