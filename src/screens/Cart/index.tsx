import ScreenLayout from "@src/layouts/ScreenLayout";
import { type RootStackScreenComponent } from "@src/routes/types";
import useCartStore from "@src/store/cart";
import { Button, Center, FlatList, Text } from "native-base";
import useCartController from "./controller";

import { CartTotal } from "./Total";
import { CartItem } from "./Item";

// eslint-disable-next-line no-empty-pattern
const Cart = ({}: RootStackScreenComponent<"Cart">) => {
  const { cartTotal, handleOpenCheckout } = useCartController();
  const cartList = useCartStore.getState().cartList;
  const hasCartItems = useCartStore.getState().cartList?.length > 0;

  const cartTotalValue = cartTotal();

  if (!hasCartItems) return <EmptyCart />;

  return (
    <ScreenLayout>
      <FlatList
        data={cartList}
        renderItem={({ item }) => <CartItem item={item} />}
      />
      <CartTotal formattedItemsTotal={cartTotalValue} />
      <Button
        className="bg-green-500 mx-4 rounded-xl mb-1"
        onPress={() => handleOpenCheckout()}
      >
        Checkout
      </Button>
    </ScreenLayout>
  );
};

export default Cart;

const EmptyCart = () => (
  <Center height="25%" testID="empty-cart">
    <Text fontWeight="bold">Carrinho vazio</Text>
  </Center>
);
