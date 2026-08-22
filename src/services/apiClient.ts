export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string; [key: string]: any }> {
  try {
    const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {})
    };

    const res = await fetch(url, {
      ...options,
      headers
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      return {
        success: false,
        error: errBody.error || `HTTP ${res.status}: ${res.statusText}`
      };
    }

    const json = await res.json();
    return json;
  } catch (err: any) {
    console.warn(`API request to ${endpoint} failed:`, err);
    return {
      success: false,
      error: err.message || 'Network error or server unreachable'
    };
  }
}
