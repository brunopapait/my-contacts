import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers
    })
  }

  post(path, options) {
    return this.makeRequest(
      path,
      {
        method: 'POST',
        body: options?.body,
        headers: options?.headers
      }
    )
  }

  async makeRequest(path, options) {
    const headers = new Headers();
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      // Object.keys(options.headers).forEach(name => {
      //   headers.append(name, options.headers[name]);
      // });

      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      })
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers
    });

    const contentType = response.headers.get('Content-Type');

    let responseBody = null;
    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
