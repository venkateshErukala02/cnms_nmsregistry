import axios, { AxiosHeaders } from 'axios';

abstract class BaseService {
  protected readonly baseUrl: string;
  protected readonly commonHeaders: AxiosHeaders | Record<string, string> = {
    'ngrok-skip-browser-warning': 'true',
  };

  constructor() {
    // Set the base URL for all API requests
    // This can be overridden in subclasses if needed
    // baseUrl should not end with a slash
    // to allow for proper URL concatenation
    this.baseUrl = '/nms/';
  }

  private getUrl(url: string) {
    if (
      url.startsWith('/') ||
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return url;
    }

    return this.baseUrl + url;
  }

  get(
    url: string,
    params: Record<string, any> = {},
    headers: AxiosHeaders | Record<string, string> = {}
  ) {
    headers = { ...this.commonHeaders, ...headers };

    return axios.get(this.getUrl(url), { headers, params });
  }

  post(
    url: string,
    data: Record<string, any> = {},
    headers: AxiosHeaders | Record<string, string> = {}
  ) {
    headers = { ...this.commonHeaders, ...headers };

    return axios.post(this.getUrl(url), data, { headers });
  }

  put(
    url: string,
    data: Record<string, any> = {},
    headers: AxiosHeaders | Record<string, string> = {}
  ) {
    headers = { ...this.commonHeaders, ...headers };

    return axios.put(this.getUrl(url), data, { headers });
  }

  delete(url: string, headers: AxiosHeaders | Record<string, string> = {}) {
    headers = { ...this.commonHeaders, ...headers };

    return axios.delete(this.getUrl(url), { headers });
  }
}

export default BaseService;
