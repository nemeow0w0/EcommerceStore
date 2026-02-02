import axios from "axios";

export const listOrderAdmin = async (token) => {
  // code
  return axios.get("http://localhost:4100/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const changeOrderStatus = async (token, orderId, orderStatus) => {
  // code
  return axios.put(
    "http://localhost:4100/api/admin/order-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const listAllUsers = async (token) => {
  // code
  return axios.get("http://localhost:4100/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const changeStatusUsers = async (token, value) => {
  // code
  return axios.post("http://localhost:4100/api/change-status", value,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const changeRoleUsers = async (token, value) => {
  // code
  return axios.post("http://localhost:4100/api/change-role", value,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}




