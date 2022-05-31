import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);
    await delay(400);

    const contentType = response.headers.get('Content-Type');

    let body = null;
    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    // Optional chaining
    throw new APIError(response, body);
  }

  async post(path, body) {
    await delay(400);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
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

    // Optional chaining
    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
