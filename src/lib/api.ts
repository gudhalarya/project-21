const normalizeBase = (value: string | undefined) => {
  if (!value || value.trim() === '') return '';
  return value.endsWith('/') ? value.slice(0, -1) : value;
};

// Prefer env override, otherwise fall back to local dev server.
export const API_BASE = normalizeBase(import.meta.env.VITE_API_BASE) || 'http://localhost:8080';

/**
 * Fetch JSON with a clearer error message when the backend returns HTML (e.g., Vite index).
 */
export async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (isJson) {
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const message = (body as Record<string, unknown>)?.['message'] as string | undefined;
      throw new Error(message || `Request failed (${response.status})`);
    }
    return response.json();
  }

  // Non-JSON responses usually mean the backend URL is wrong or the server is down
  const text = await response.text();
  const hint = text.startsWith('<!DOCTYPE')
    ? 'Received HTML instead of JSON. Is the API base URL pointing to the React dev server?'
    : text.slice(0, 140) || 'Unexpected response from server';

  throw new Error(`${response.status} ${response.statusText}: ${hint}`);
}
