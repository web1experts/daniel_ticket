
import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("accessToken") || null;
}

export function isAuth() {
  try {
    const token = getToken();

    // Ensure token is a non-empty string before decoding
    if (typeof token !== "string" || !token.trim()) {
      return false;
    }

    const decoded = jwtDecode(token);
    return decoded || false;
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
}

export function login(token) {
  if (typeof token === "string" && token.trim()) {
    localStorage.setItem("accessToken", token);
    return true;
  } else {
    console.error("Invalid token passed to login()");
    return false;
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
  window.location.replace("/sign-in");
  return true;
}

export function decodedLoggedUser() {
  const token = getToken();

  if (typeof token !== "string" || !token.trim()) {
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Failed to decode user token:", err);
    return null;
  }
}

export function setRemember(user = {}) {
  localStorage.setItem("userRemember", JSON.stringify(user || isAuth()));
  return true;
}

export function removeRemember() {
  localStorage.removeItem("userRemember");
  return true;
}
