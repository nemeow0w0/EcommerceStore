import axios from "axios";

export const createUserCart = async (token, cart) => {
  // code
  return axios.post("http://localhost:4100/api/user/cart", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUserCart = async (token) => {
  // code
  return axios.get("http://localhost:4100/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = async (token, address) => {
  // code
  return axios.post(
    "http://localhost:4100/api/user/address",
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const saveOrder = async (token, payload) => {
  // code
  return axios.post("http://localhost:4100/api/user/order", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listOrder = async (token) => {
  // code
  return axios.get("http://localhost:4100/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
