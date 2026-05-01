const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://luminous-victory.up.railway.app';

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });
  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.error || data?.message || response.statusText || 'Request failed';
    throw new Error(message);
  }

  return data;
}

export function registerUser(payload) {
  return apiRequest('/api/users/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function requestOtp(payload) {
  return apiRequest('/api/users/request-otp', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function verifyOtp(payload) {
  return apiRequest('/api/users/verify-otp', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function fetchServices() {
  return apiRequest('/api/services');
}

export function createService(payload) {
  return apiRequest('/api/services', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function updateService(id, payload) {
  return apiRequest(`/api/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export function deleteService(id) {
  return apiRequest(`/api/services/${id}`, {
    method: 'DELETE'
  });
}

export function fetchReports() {
  return apiRequest('/api/reports');
}

export function fetchFeedback() {
  return apiRequest('/api/feedback');
}

export function createReport(payload) {
  return apiRequest('/api/reports', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function createFeedback(payload) {
  return apiRequest('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
