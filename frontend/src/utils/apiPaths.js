const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const BASE_URL = isLocal 
  ? "http://localhost:3000/api" 
  : "https://ai-interview-prep-38pn.onrender.com/api";

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
