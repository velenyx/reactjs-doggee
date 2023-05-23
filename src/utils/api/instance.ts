/* eslint-disable @typescript-eslint/no-unused-vars */
type BaseUrl = string;
const baseUrl: BaseUrl = 'http://localhost:5000/api/';

export class API {
  readonly baseUrl: BaseUrl;

  constructor(baseUrl: BaseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'GET',
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(!!options?.headers && options.headers)
      }
    });

    if (!response.ok) throw new Error(response.statusText);

    const responseData = await response.json();
    return { data: responseData };
  }

  get(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint: string, body: Record<string, any>, options: RequestInit = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      ...(!!body && { body: JSON.stringify(body) })
    });
  }
}

export const api = new API(baseUrl);
