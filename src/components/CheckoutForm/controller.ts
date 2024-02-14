import { NavigationRoutes } from "@src/routes/types";
import useCartStore from "@src/store/cart";
import { useState } from "react";

const PUBLIC_KEY = process.env.EXPO_PUBLIC_FRAMES_REACT_NATIVE_KEY;

const useCheckoutFormController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const publicKey = PUBLIC_KEY!;
  const [isValid, setIsValid] = useState(false);
  const checkoutMutation = useCartStore((state) => state.checkoutCart());
  const clearCart = useCartStore((state) => state.clearCart);

  const totalCartValue = useCartStore((state) =>
    state.getTotalValueCartItems(),
  );

  const handleCheckout = (navigation: NavigationRoutes | undefined) => {
    const cartList = useCartStore.getState().cartList;

    setIsLoading(true);
    try {
      checkoutMutation.mutate(cartList);
      setTimeout(() => {
        clearCart();
        alert("Compra realizada com sucesso");
        navigation?.navigate("Home");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      alert("Ops! Algo deu errado, tente novamente mais tarde.");
      setIsLoading(false);
    }
  };

  return {
    handleCheckout,
    totalCartValue,
    isValid,
    setIsValid,
    publicKey,
    isLoading,
  };
};

export default useCheckoutFormController;
