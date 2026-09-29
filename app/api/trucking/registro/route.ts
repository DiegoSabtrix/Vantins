const WEBHOOK_HOST = 'services.leadconnectorhq.com';
const STATES = new Set(['FL', 'TX']);
const STAGES: Record<string, string> = { starting: 'New Venture', renewing: 'Renovación', adding: 'Agregar camiones' };
const COVERAGES: Record<string, string> = {
  liability: 'Liability',
  motor_truck_cargo: 'Motor Truck Cargo',
  physical_damage: 'Physical Damage',
  trailer_interchange: 'Trailer Interchange',
  reefer_breakdown: 'Reefer Breakdown',
  not_sure: 'No estoy seguro',
};
const TRUCK_RANGES: Record<string, string> = { one: '1', two_to_four: '2–4', five_plus: '5 o más', no_truck: 'Aún no tengo camión' };
const json = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const owns = (record: Record<string, string>, key: string) => Object.prototype.hasOwnProperty.call(record, key);

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max + 1) : '';
}

export async function POST(request: Request) {
  let endpoint: URL;
  try {
    endpoint = new URL(process.env.GHL_TRUCKING_WEBHOOK_URL || '');
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
    if (clean(data.website, 100)) return json({ ok: true }); // Hidden bot field.

    const name = clean(data.name, 100);
    const phone = clean(data.phone, 30);
    const state = clean(data.state, 2).toUpperCase();
    const kind = clean(data.kind, 20);
    const trucks = clean(data.trucks, 20);
    const coverages = data.coverages;
    if (
      name.length < 2 || name.length > 100 ||
      !/^\+?[\d\s().-]{10,30}$/.test(phone) || phone.replace(/\D/g, '').length < 10 ||
      !STATES.has(state) || !owns(STAGES, kind) ||
      (trucks !== '' && !owns(TRUCK_RANGES, trucks)) ||
      !Array.isArray(coverages) || coverages.length > 6 ||
      coverages.some((item) => typeof item !== 'string' || !owns(COVERAGES, item)) ||
      new Set(coverages).size !== coverages.length ||
      (coverages.includes('not_sure') && coverages.length > 1) ||
      data.contactConsent !== true
    ) return json({ error: 'Revisa los campos señalados e intenta nuevamente.' }, 400);

    const source = data.utm && typeof data.utm === 'object' && !Array.isArray(data.utm) ? data.utm as Record<string, unknown> : {};
    const [firstName, ...lastNames] = name.split(/\s+/);
    const coverageLabels = (coverages as string[]).map((item) => COVERAGES[item]);
    const stage = STAGES[kind];
    const truckRange = trucks ? TRUCK_RANGES[trucks] : '';
    const payload = {
      event: 'trucking_call_request',
      source: 'vantins.com/trucking/registro',
      page_source: '/trucking/registro',
      origin_page: 'https://www.vantins.com/trucking/registro',
      form_source: 'trucking_call_request',
      form_type: 'Trucking Call Request',
      lead_status: 'Nuevo registro — llamar',
      opportunity_name: `${name} — ${stage}`,
      name,
      first_name: firstName,
      last_name: lastNames.join(' '),
      phone,
      state,
      operation_state: state,
      operation_status: kind,
      stage,
      coverage_interests: coverageLabels,
      coverage_interests_text: coverageLabels.join(', '),
      truck_count_range: truckRange,
      internal_notification_line: [name, phone, state, stage, truckRange || 'Sin indicar', coverageLabels.join(', ') || 'Sin indicar'].join(' | '),
      consent_to_call_about_request: true,
      marketing_sms_consent: false,
      submitted_at: new Date().toISOString(),
      utm_source: clean(source.source, 100),
      utm_medium: clean(source.medium, 100),
      utm_campaign: clean(source.campaign, 100),
      utm_content: clean(source.content, 100),
      utm_term: clean(source.term, 100),
      utm_segment: clean(source.segment, 100),
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
