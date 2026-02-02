import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, SearchFilters } from "../api/product";
import _, { isEqual, unionWith } from "lodash";

const ecomStore = (set, get) => ({
  // key: value
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    // Step Uniqe
    const uniqe = unionWith(updateCart, isEqual);

    set({ carts: uniqe });
  },
  actionUpdateQuatity: (productId, newQuantity) => {
    //console.log('update click',productId,newQuantity)

    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  actionRemoveCartProduct: (productId) => {
    //console.log('remove',productId)
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  actionGetTotalPrice: () => {
    //console.log('total')
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:4100/api/login", form);
    //console.log(res.data.token)
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    try {
      // code
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    try {
      // code
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionsearchFilters: async (arg) => {
    try {
      // code
      const res = await SearchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  clearCart: () => {
    set({ carts: [] });
  },
  logout: () => {
    set({ user: null, token: null, categories: [], products: [], carts: [] });
  },
});

const usePersist = {
  name: "econ-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
