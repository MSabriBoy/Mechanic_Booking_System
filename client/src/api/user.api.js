import api from "./axios";

export const getUsers = async (
  params = {},
  signal
) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      return (
        value !== "" &&
        value !== null &&
        value !== undefined
      );
    })
  );

  const response = await api.get("/users", {
    params: cleanParams,
    signal,
  });

  return response.data;
};

export const createUser = async (payload) => {
  const response = await api.post("/users", payload);
  return response.data;
};

export const updateUserRole = async (
  id,
  payload
) => {
  const response = await api.patch(
    `/users/${id}/role`,
    payload
  );

  return response.data;
};

export const updateUserStatus = async (
  id,
  payload
) => {
  const response = await api.patch(
    `/users/${id}/status`,
    payload
  );

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);

  return response.data;
};