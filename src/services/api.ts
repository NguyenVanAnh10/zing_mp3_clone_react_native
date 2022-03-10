import qs from 'query-string';

import configs from 'configs/configs';

const onErrors: any[] = [];

async function sendRequest(
  method: string,
  path: string,
  data = {},
  headers = {},
) {
  let url = `${configs.baseAPI}${path}`;
  const opts: RequestInit = {
    method,
    headers,
  };
  if (method === 'GET' || method === 'DELETE') {
    const query = qs.stringify(data);
    if (query) {
      url += `?${query}`;
    }
  } else {
    opts.headers = {...opts.headers, 'Content-Type': 'application/json'};
    opts.body = JSON.stringify(data);
  }
  try {
    const res = await fetch(url, opts);
    const contentType = res.headers.get('content-type');
    let body;
    if (contentType && contentType.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }
    if (res.status === 200) {
      return body;
    }
    throw body;
  } catch (e) {
    if (e instanceof Error) {
      e = {
        error: `${e}`,
        message: 'Something went wrong while sending API request',
      };
    }
    try {
      onErrors.forEach(c => c(e));
    } catch (ee) {
      console.log(ee);
    }
    throw e;
  }
}

export default {
  GET(path: string, data = {}) {
    return sendRequest('GET', path, data);
  },
  POST(path: string, data = {}) {
    return sendRequest('POST', path, data);
  },
  PUT(path: string, data = {}) {
    return sendRequest('PUT', path, data);
  },
  DELETE(path: string, data = {}) {
    return sendRequest('DELETE', path, data);
  },
  onError(callback: () => void) {
    onErrors.push(callback);
  },
};
