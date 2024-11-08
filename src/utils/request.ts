interface RequestOptions {
  method?: string;
  headers?: HeadersInit;
  body?: any;
  token?: string; // 添加token字段
}

const requestConfig = {
  baseUrl: 'http://localhost:3000',
}

async function request(path: string, options: RequestOptions = {}) {
  const token = sessionStorage.getItem('token');

  const { method = 'GET', headers = {}, body } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}), // 如果有token，添加Authorization头
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    mode: 'cors',
  };

  try {
    const response = await fetch(requestConfig.baseUrl+path, config);
    if (!response.ok) {
      if (response.statusText === 'Unauthorized') {
        sessionStorage.removeItem('token');
        window.location.replace('/login');
        return;
      }
      return {
        success: false,
        code: response.status,
        message: response.statusText,
      };
    }
    return await response.json();
  } catch (error) {
    console.error('Request failed', error);
    return {
      success: false,
      code: 500,
      message: 'Request failed',
    }
  }
}

export default request;