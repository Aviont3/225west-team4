const BASE_URL = '/api';

export async function fetchWorkOrders(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/workorders?${query}`);
  if (!res.ok) throw new Error(`Failed to fetch work orders: ${res.status}`);
  return res.json();
}

export async function fetchAssets(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/assets?${query}`);
  if (!res.ok) throw new Error(`Failed to fetch assets: ${res.status}`);
  return res.json();
}

export async function fetchLocations() {
  const res = await fetch(`${BASE_URL}/locations`);
  if (!res.ok) throw new Error(`Failed to fetch locations: ${res.status}`);
  return res.json();
}

// Challenge 2: Signal endpoints

export async function submitSignal(workOrderId, observation) {
  const res = await fetch(`${BASE_URL}/signal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workOrderId, observation }),
  });
  if (!res.ok) throw new Error(`Failed to submit signal: ${res.status}`);
  return res.json();
}

export async function getEnrichment(workOrderId) {
  const res = await fetch(`${BASE_URL}/signal/enrich/${workOrderId}`);
  if (!res.ok) throw new Error(`Failed to get enrichment: ${res.status}`);
  return res.json();
}

export async function submitFeedback(workOrderId, status, comment = '') {
  const res = await fetch(`${BASE_URL}/signal/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workOrderId, status, comment }),
  });
  if (!res.ok) throw new Error(`Failed to submit feedback: ${res.status}`);
  return res.json();
}
