import { Item } from "@src/@types/item";
import queries from "@src/queries";
import { UseMutationResult } from "@tanstack/react-query";
import { create } from "zustand";

interface CartStoreState {
  cartList: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: string) => void;
  checkoutCart: () => UseMutationResult<boolean, Error, Item[], unknown>;
  hasCartItems: () => boolean;
  getTotalCartItems: () => number;
  getTotalValueCartItems: () => number;
  clearCart: () => void;
}
const useCartStore = create<CartStoreState>((set, get) => ({
  cartList: [],
  addToCart: (item) =>
    set((state) => ({ cartList: [...state.cartList, item] })),
  removeFromCart: (id) =>
    set((state) => ({
      cartList: state.cartList.filter((item) => item.id !== id),
    })),
  checkoutCart: queries.checkoutItems,
  hasCartItems: () => {
    const cartList = get().cartList;

    return cartList.length > 0;
  },
  getTotalCartItems: () => {
    const cartList = get().cartList;

    return cartList.length;
  },
  getTotalValueCartItems() {
    const cartList = get().cartList;

    return +cartList.reduce((prev, cur) => prev + +cur.price, 0).toFixed(2);
  },
  clearCart: () => set({ cartList: [] }),
}));

export default useCartStore;
