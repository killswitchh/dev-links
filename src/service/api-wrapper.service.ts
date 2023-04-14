import { PUBLIC_GITHUB_API_TOKEN } from '$env/static/public';
import { Provider } from '@prisma/client';
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
  async get(url: string, provider: Provider | undefined = undefined) {
    const header = this.getHeader(provider);
    console.log('GET REQ', url, header);
    const response = await fetch(url, {
      method: HTTP_METHODS.GET,
      headers: header,
    });
    return await this.handleError(response);
  },

  async handleError(response: Response) {
    const getResponse = await response.json();
    if (response.status >= 400) {
      console.error('{ERROR]: Error found');
      throw new AppError(getResponse.message, response.status);
    }
    return getResponse;
  },

  async post(url: string, body: unknown) {
    console.log('POST REQ', url, body);
    const response = await fetch(url, {
      method: HTTP_METHODS.POST,
      headers: this.getDefaultHeaders(),
      body: JSON.stringify(body),
    });
    return await response.json();
  },

  async patch(url: string, body?: unknown) {
    console.log('PATCH REQ', url, body);
    const response = await fetch(url, {
      method: HTTP_METHODS.PATCH,
      headers: this.getDefaultHeaders(),
      body: body ? JSON.stringify(body) : null,
    });
    return await response.json();
  },

  async delete(url: string) {
    console.log('DELETE REQ', url);
    const response = await fetch(url, {
      method: HTTP_METHODS.DELETE,
      headers: this.getDefaultHeaders(),
    });
    return await response.json();
  },

  getDefaultHeaders(): HeadersInit | undefined {
    return { 'Content-Type': 'application/json' };
  },

  getGithubHeaders(): HeadersInit | undefined {
    return {
      'Content-Type': 'application/json',
      Authorization: `token ${PUBLIC_GITHUB_API_TOKEN}`,
    };
  },
  getHeader(provider: Provider | undefined) {
    switch (provider) {
      case Provider.GITHUB:
      case Provider.GITHUB_PROFILE:
      case Provider.GITHUB_REPOSITORY:
        return ApiWrapper.getGithubHeaders();
      default:
        return ApiWrapper.getDefaultHeaders();
    }
  },
};
