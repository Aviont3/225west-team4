import fetch from 'node-fetch';
import { getAccessToken } from './auth.js';

const API_URL = process.env.CA_API_URL;

/**
 * Execute a GraphQL query against the CriticalAsset API.
 * Handles auth header injection and 401 retry.
 */
export async function graphqlQuery(query, variables = {}) {
  let token = await getAccessToken();

  let response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  // If 401, force re-auth and retry once
  if (response.status === 401) {
    console.warn('⚠️ Got 401, re-authenticating...');
    token = await getAccessToken();
    response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    });
  }

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    throw new Error(`GraphQL error: ${json.errors[0]?.message || 'Unknown'}`);
  }

  return json.data;
}
