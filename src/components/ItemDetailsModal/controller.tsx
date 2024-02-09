/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { IToastService } from "native-base/lib/typescript/components/composites/Toast";
import { Item } from "@src/@types/item";
import { Text } from "native-base";
import useCartStore from "@src/store/cart";

interface HandleAddToCartProps {
  item: Item;
  toast: IToastService;
  alreadyInCart: boolean;
}
export const useItemDetailsModalController = create<{
  modalVisible: boolean;
  setModalVisibility: (visible: boolean) => void;
  handleAddToCart: ({
    item,
    toast,
    alreadyInCart,
  }: HandleAddToCartProps) => void;
  hasItemInCart: (itemId: number) => boolean;
}>((set) => ({
  modalVisible: false,
  setModalVisibility: (visible: boolean) => set({ modalVisible: visible }),
  handleAddToCart: ({ item, toast, alreadyInCart }) => {
    if (alreadyInCart) {
      toast.show({
        placement: "top",
        render: () => <Text>Item já está no carrinho!</Text>,
      });
      return;
    }
    toast.show({
      placement: "top",
      render: () => <Text>Item adicionado ao carrinho!</Text>,
    });

    const addToCart = useCartStore.getState().addToCart;

    addToCart(item);
  },
  hasItemInCart: (itemId) => {
    const cartList = useCartStore.getState().cartList;
    return cartList.some((item) => item.id === itemId);
  },
}));