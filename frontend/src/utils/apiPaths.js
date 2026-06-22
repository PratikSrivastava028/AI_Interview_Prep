const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  const hostname = window.location.hostname;
  
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";
  const isLocalIP = hostname.startsWith("192.168.") || hostname.startsWith("10.") || hostname.startsWith("172.");
  const isLocal = isLocalHost || isLocalIP;

  if (isLocal) {
    let port = "5000"; // Default local backend port
    if (envUrl) {
      try {
        const urlObj = new URL(envUrl);
        if (urlObj.port) {
          port = urlObj.port;
        }
      } catch (e) {
        // Fallback if envUrl is just a port number
        if (/^\d+$/.test(envUrl)) {
          port = envUrl;
        }
      }
    }
    return `http://${hostname}:${port}/api`;
  }

  if (envUrl) {
    return envUrl.endsWith("/api") ? envUrl : `${envUrl}/api`;
  }

  return "https://ai-interview-prep-ajxo.onrender.com/api";
};

export const BASE_URL = getBaseURL();

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    GET_ME: `${BASE_URL}/auth/me`,
  },
  SESSION: {
    CREATE: `${BASE_URL}/sessions/create`,
    GET_ALL: `${BASE_URL}/sessions/my-sessions`,
    GET_ONE: `${BASE_URL}/sessions`, // usage: GET_ONE/:id
  },
  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/ai/generate-questions`,
    EXPLAIN: `${BASE_URL}/ai/generate-explanation`,
  },
};
