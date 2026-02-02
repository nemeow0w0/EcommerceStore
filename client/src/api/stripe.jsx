import axios from "axios";

export const payment = async (token) =>
  await axios.post(
    "http://localhost:4100/api/user/create-checkout-session",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
