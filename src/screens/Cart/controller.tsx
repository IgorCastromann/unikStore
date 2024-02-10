import useCartStore from "@src/store/cart";
import { formatToBRL } from "@src/utils/formatter";

export const useCartController = () => {
  const cartTotal = () => {
    const cartList = useCartStore((state) => state.cartList);

    const cartTotal = cartList.reduce((prev, cur) => prev + +cur.price, 0);
    return formatToBRL(cartTotal);
  };

  const handleOpenCheckout = () => {
    alert("TODO checkout");
  };

  return {
    cartTotal,
    handleOpenCheckout,
  };
};

export default useCartController;
