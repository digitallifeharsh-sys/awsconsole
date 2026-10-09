import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

const request = async (path, options = {}) => {
  try {
    const response = await client.request({ url: '/sms/2factor' + path, ...options });
    const data = response.data;
    if (data?.success === false) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  } catch (error) {
    if (error instanceof Error && !axios.isAxiosError(error)) throw error;
    const message = error.response?.data?.message
      || (error.code === 'ECONNABORTED' ? 'Backend request timed out' : '')
      || (error.response ? `Request failed (${error.response.status})` : 'Backend is unreachable. Check that it is running.');
    throw new Error(message);
  }
};

export const twoFactorConfigApi = {
  list: () => request('/config'),
  get: id => request('/config/' + encodeURIComponent(id)),
  create: data => request('/config', { method: 'POST', data }),
  update: (id, data) => request('/config/' + encodeURIComponent(id), { method: 'PUT', data }),
  remove: id => request('/config/' + encodeURIComponent(id), { method: 'DELETE' }),
  testSms: (id, data) => request('/config/' + encodeURIComponent(id) + '/test-sms', { method: 'POST', data }),
  testCall: (id, data) => request('/config/' + encodeURIComponent(id) + '/test-call', { method: 'POST', data }),
};
