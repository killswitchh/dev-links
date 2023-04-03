import AppError from '../core/models/app-error.dto';

export enum HTTP_METHODS {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

export const ApiWrapper = {
  async get(url: string) {
    console.log('GET REQ', url);
    const response = await fetch(url, {
      method: HTTP_METHODS.GET,
      headers: this.getDefaultHeaders(),
    });
    return await this.handleError(response);
  },

  async handleError(response: any) {
    const getResponse: any = await response.json();
    if (response.status >= 400) {
      console.log('error found');
      throw new AppError(getResponse.message, response.status);
    }
    return getResponse;
  },

  async post(url: string, body: any) {
    console.log('POST REQ', url, body);
    const response = await fetch(url, {
      method: HTTP_METHODS.POST,
      headers: this.getDefaultHeaders(),
      body: JSON.stringify(body),
    });
    return await response.json();
  },

  async patch(url: string, body?: any) {
    console.log('PATCH REQ', url, body);
    const response = await fetch(url, {
      method: HTTP_METHODS.PATCH,
      headers: this.getDefaultHeaders(),
      body: body ? JSON.stringify(body) : null,
    });
    return await response.json();
  },

  getDefaultHeaders(): HeadersInit | undefined {
    return { 'Content-Type': 'application/json' };
  },
};
