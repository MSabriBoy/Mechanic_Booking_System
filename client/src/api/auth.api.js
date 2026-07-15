import api from "./axios.js";

const registerUser = async (credentials) => {
  const response = await api.post("/auth/register", credentials);
  return response.data;
};

const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export { registerUser, loginUser, getCurrentUser };