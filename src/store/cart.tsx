import { Item } from "@src/@types/item";
import { create } from "zustand";

interface CartStoreState {
  cartList: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  checkoutCart: () => void;
  hasCartItems: () => boolean;
  getTotalCartItems: () => number;
  getTotalValueCartItems: () => number;
}
const useCartStore = create<CartStoreState>((set, get) => ({
  cartList: [],
  addToCart: (item: Item) =>
    set((state) => ({ cartList: [...state.cartList, item] })),
  removeFromCart: (id: number) =>
    set((state) => ({
      cartList: state.cartList.filter((item: Item) => item.id !== id),
    })),
  checkoutCart: () => set({ cartList: [] }),
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
}));

export default useCartStore;
