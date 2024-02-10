/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { IToastService } from "native-base/lib/typescript/components/composites/Toast";
import { Item } from "@src/@types/item";
import useCartStore from "@src/store/cart";
import ToastTemplate from "../ToastTemplate";
import { NavigationRoutes } from "@src/routes/types";

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
  handleRemoveItemFromCart: (itemId: number, toast: IToastService) => void;
  handleNavigateToCart: (navigation: NavigationRoutes | undefined) => void;
}>((set, get) => ({
  modalVisible: false,
  setModalVisibility: (visible: boolean) => set({ modalVisible: visible }),
  handleAddToCart: ({ item, toast, alreadyInCart }) => {
    if (alreadyInCart) {
      toast.show({
        placement: "top",
        render: () => (
          <ToastTemplate message="Item já está no carrinho!" type="info" />
        ),
      });
      return;
    }
    toast.show({
      placement: "top",
      render: () => (
        <ToastTemplate message="Item adicionado ao carrinho!" type="success" />
      ),
    });

    const addToCart = useCartStore.getState().addToCart;

    addToCart(item);
  },
  hasItemInCart: (itemId) => {
    const cartList = useCartStore.getState().cartList;
    return cartList.some((item) => item.id === itemId);
  },
  handleRemoveItemFromCart: (itemId, toast) => {
    const removeFromCart = useCartStore.getState().removeFromCart;

    removeFromCart(itemId);
    toast.show({
      placement: "top",
      render: () => (
        <ToastTemplate message="Item removido do carrinho!" type="success" />
      ),
    });
  },
  handleNavigateToCart: (navigation) => {
    const setModalVisibility = get().setModalVisibility;
    setModalVisibility(false);
    navigation?.navigate("Cart");
  },
}));
