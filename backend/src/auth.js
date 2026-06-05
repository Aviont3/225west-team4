import fetch from 'node-fetch';

const API_URL = process.env.CA_API_URL;
const CLIENT_ID = process.env.CA_CLIENT_ID;
const CLIENT_SECRET = process.env.CA_CLIENT_SECRET;

let tokenCache = {
  accessToken: null,
  refreshToken: null,
  expiresAt: 0,
};

/**
 * Get a valid access token — fetches new one or refreshes expired one.
 */
export async function getAccessToken() {
  const now = Date.now();

  // If token is still valid (with 60s buffer), return cached
  if (tokenCache.accessToken && now < tokenCache.expiresAt - 60000) {
    return tokenCache.accessToken;
  }

  // If we have a refresh token, try refreshing first
  if (tokenCache.refreshToken) {
    try {
      const refreshed = await refreshAccessToken(tokenCache.refreshToken);
      return refreshed;
    } catch (err) {
      console.warn('Refresh failed, re-authenticating:', err.message);
    }
  }

  // Fresh authentication
  return await authenticateClient();
}

/**
 * Authenticate with client credentials to get initial tokens.
 */
async function authenticateClient() {
  const query = `mutation ApplicationToken($input: ApplicationClientCredentialsInput!) {
    applicationClientCredentialsToken(input: $input) {
      accessToken
      refreshToken
      tokenType
      expiresIn
      scope
    }
  }`;

  const variables = {
    input: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      scope: 'workorders.read assets.read locations.read',
    },
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(`Auth failed: ${JSON.stringify(json.errors)}`);
  }

  const data = json.data.applicationClientCredentialsToken;
  tokenCache = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresAt: Date.now() + data.expiresIn * 1000,
  };

  console.log('✅ Authenticated successfully. Scopes:', data.scope);
  return data.accessToken;
}

/**
 * Refresh an expired access token.
 */
async function refreshAccessToken(refreshToken) {
  const query = `mutation RefreshApplicationToken($refreshToken: String!) {
    applicationRefreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      tokenType
      expiresIn
      scope
    }
  }`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { refreshToken } }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(`Refresh failed: ${JSON.stringify(json.errors)}`);
  }

  const data = json.data.applicationRefreshToken;
  tokenCache = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresAt: Date.now() + data.expiresIn * 1000,
  };

  console.log('🔄 Token refreshed successfully.');
  return data.accessToken;
}
