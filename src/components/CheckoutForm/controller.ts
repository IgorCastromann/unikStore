import useCartStore from "@src/store/cart";
import { useState } from "react";

const PUBLIC_KEY = process.env.EXPO_PUBLIC_FRAMES_REACT_NATIVE_KEY;

const useCheckoutFormController = () => {
  const publicKey = PUBLIC_KEY!;
  const [isValid, setIsValid] = useState(false);

  const totalCartValue = useCartStore((state) =>
    state.getTotalValueCartItems(),
  );

  const checkoutCart = useCartStore((state) => state.checkoutCart);

  const handleCheckout = () => {
    checkoutCart();
  };

  return {
    handleCheckout,
    totalCartValue,
    isValid,
    setIsValid,
    publicKey,
  };
};

export default useCheckoutFormController;
