const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (envUrl) {
    return envUrl.endsWith("/api") ? envUrl : `${envUrl}/api`;
  }

  // Fallback to the live backend URL so anyone can use the frontend without local backend setup
  return "https://ai-interview-prep-lksz.onrender.com/api";
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
