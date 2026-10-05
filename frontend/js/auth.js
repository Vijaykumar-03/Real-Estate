export function getToken() {
  return localStorage.getItem("access_token");
}

export function setToken(token) {
  localStorage.setItem("access_token", token);
}

export function clearToken() {
  localStorage.removeItem("access_token");
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "login.html";
  }
}

function updateNavigation() {
  const loggedIn = isAuthenticated();

  document.querySelectorAll("[data-auth-link]").forEach(el => {
    el.hidden = !loggedIn;
  });

  document.querySelectorAll("[data-guest-link]").forEach(el => {
    el.hidden = loggedIn;
  });

  document.querySelectorAll("[data-logout]").forEach(el => {
    el.hidden = !loggedIn;
    el.addEventListener("click", () => {
      clearToken();
      window.location.href = "index.html";
    });
  });
}

document.addEventListener("DOMContentLoaded", updateNavigation);
