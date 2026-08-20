const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8082";

async function handle(res) {
  let body = null;
  try {
    body = await res.json();
  } catch {
    /* empty body */
  }
  if (!res.ok) {
    const message =
      (body && (body.error || Object.values(body)[0])) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return body;
}

export const api = {
  base: API_BASE,

  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/api/contact/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  async getProjects() {
    const res = await fetch(`${API_BASE}/api/projects`);
    return handle(res);
  },

  async getCertificates() {
    const res = await fetch(`${API_BASE}/api/certificates`);
    return handle(res);
  },

  certificateFileUrl(id) {
    return `${API_BASE}/api/certificates/${id}/file`;
  },

  async sendContact(payload) {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handle(res);
  },

  projectImageUrl(id) {
    return `${API_BASE}/api/projects/${id}/image`;
  },

  async addProject(formData, pin) {
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: "POST",
      headers: { "X-Admin-Pin": pin },
      body: formData,
    });
    return handle(res);
  },

  async getProject(id) {
    const res = await fetch(`${API_BASE}/api/projects/${id}`);
    return handle(res);
  },

  async updateProject(id, formData, pin) {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      method: "PUT",
      headers: { "X-Admin-Pin": pin },
      body: formData,
    });
    return handle(res);
  },

  async deleteProject(id, pin) {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      method: "DELETE",
      headers: { "X-Admin-Pin": pin },
    });
    return handle(res);
  },

  async uploadCertificate(formData, pin) {
    const res = await fetch(`${API_BASE}/api/certificates`, {
      method: "POST",
      headers: { "X-Admin-Pin": pin },
      body: formData,
    });
    return handle(res);
  },

  async deleteCertificate(id, pin) {
    const res = await fetch(`${API_BASE}/api/certificates/${id}`, {
      method: "DELETE",
      headers: { "X-Admin-Pin": pin },
    });
    return handle(res);
  },

  async getResume() {
    const res = await fetch(`${API_BASE}/api/resume`);
    return handle(res);
  },

  resumeFileUrl() {
    return `${API_BASE}/api/resume/file`;
  },

  async uploadResume(formData, pin) {
    const res = await fetch(`${API_BASE}/api/resume`, {
      method: "POST",
      headers: { "X-Admin-Pin": pin },
      body: formData,
    });
    return handle(res);
  },
};
