import useCartStore from "@src/store/cart";
import { formatToBRL } from "@src/utils/formatter";
import { useState } from "react";

export const useCartController = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartTotal = () => {
    const cartList = useCartStore((state) => state.cartList);

    const cartTotal = cartList.reduce((prev, cur) => prev + +cur.price, 0);
    return formatToBRL(cartTotal);
  };

  const handleOpenCheckout = () => {
    setIsModalOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsModalOpen(false);
  };

  return {
    cartTotal,
    handleOpenCheckout,
    handleCloseCheckout,
    isModalOpen,
  };
};

export default useCartController;
