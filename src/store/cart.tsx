import { Item } from "@src/@types/item";
import { create } from "zustand";

const useCartStore = create<{
  cartList: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  checkoutCart: () => void;
  hasCartItems: () => boolean;
}>((set, get) => ({
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
}));

export default useCartStore;
