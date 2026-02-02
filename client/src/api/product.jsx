import axios from "axios";

export const createProduct = async (token, form) => {
  // code
  return axios.post("http://localhost:4100/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listProduct = async (count = 20) => {
  // code
  return axios.get("http://localhost:4100/api/products/" + count);
};
export const readProduct = async (token, id) => {
  // code
  return axios.get("http://localhost:4100/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (token, id) => {
  // code
  return axios.delete("http://localhost:4100/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProduct = async (token, id, form) => {
  // code
  return axios.put("http://localhost:4100/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  // code
  console.log("form api frontend", form);
  return axios.post(
    "http://localhost:4100/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const RemoveFiles = async (token, public_id) => {
  // code
  // console.log('form api frontend', form)
  return axios.post(
    "http://localhost:4100/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const SearchFilters = async (arg) => {
  // code
  return axios.post("http://localhost:4100/api/search/filters", arg);
};

export const ListProductBestSelling = async (sort, order, limit) => {
  // code
  return axios.post("http://localhost:4100/api/productby", {
    sort,
    order,
    limit,
  });
};
