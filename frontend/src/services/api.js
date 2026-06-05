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
