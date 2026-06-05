/**
 * CriticalAsset OAuth client-credentials token service.
 * SERVER-SIDE ONLY — never import this in browser/client bundles.
 *
 * Usage:
 *   import { getAccessToken } from './criticalAssetAuth';
 *   const token = await getAccessToken();
 *
 * Required env vars:
 *   CA_CLIENT_ID
 *   CA_CLIENT_SECRET
 */

const TOKEN_URL = 'https://api.criticalasset.com/oauth/token';
const SCOPE = 'workorders:read assets:read locations:read';
const EXPIRY_BUFFER_SECONDS = 60;

interface TokenCache {
  accessToken: string;
  expiresAt: number; // epoch ms
}

let cache: TokenCache | null = null;

async function fetchNewToken(): Promise<TokenCache> {
  const clientId = process.env.CA_CLIENT_ID;
  const clientSecret = process.env.CA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing required env vars: CA_CLIENT_ID, CA_CLIENT_SECRET');
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: SCOPE,
  });

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Token request failed: ${response.status} ${response.statusText} — ${text}`);
  }

  const data = await response.json() as { access_token: string; expires_in: number };

  if (!data.access_token || typeof data.expires_in !== 'number') {
    throw new Error('Unexpected token response shape');
  }

  return {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in - EXPIRY_BUFFER_SECONDS) * 1000,
  };
}

/**
 * Returns a valid access token, refreshing automatically when expired or near expiry.
 */
export async function getAccessToken(): Promise<string> {
  if (!cache || Date.now() >= cache.expiresAt) {
    cache = await fetchNewToken();
  }
  return cache.accessToken;
}
