// Central API client.
// Change only this URL when the Flask backend location changes.
export const API_BASE_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("access_token");
}

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    if (typeof data === "object" && data) {
      message = data.message || data.error || data.msg || message;
    } else if (data) {
      message = data;
    }
    throw new Error(message);
  }

  return data;
}

export const api = {
  login(credentials) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
  },

  register(user) {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(user)
    });
  },

  me() {
    return request("/auth/me");
  },

  getProperties() {
    return request("/properties");
  },

  getProperty(id) {
    return request(`/properties/${encodeURIComponent(id)}`);
  },

  createProperty(property) {
    return request("/properties", {
      method: "POST",
      body: JSON.stringify(property)
    });
  },

  updateProperty(id, property) {
    return request(`/properties/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(property)
    });
  },

  deleteProperty(id) {
    return request(`/properties/${encodeURIComponent(id)}`, {
      method: "DELETE"
    });
  }
};
