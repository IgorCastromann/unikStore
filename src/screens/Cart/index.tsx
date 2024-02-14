import ScreenLayout from "@src/layouts/ScreenLayout";
import { type RootStackScreenComponent } from "@src/routes/types";
import useCartStore from "@src/store/cart";
import { Button, Center, FlatList, Text, View } from "native-base";
import useCartController from "./controller";

import { CartTotal } from "./Total";
import { CartItem } from "./Item";
import { Item } from "@src/@types/item";
import { CheckoutModal } from "@src/components/CheckoutModal";

const Cart = ({ navigation }: RootStackScreenComponent<"Cart">) => {
  const { cartTotal, handleOpenCheckout, isModalOpen, handleCloseCheckout } =
    useCartController();
  const cartList = useCartStore((state) => state.cartList);

  const cartTotalValue = cartTotal();

  const hasCartItems = cartList.length > 0;

  if (!hasCartItems) return <EmptyCart />;

  return (
    <ScreenLayout height="100%">
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseCheckout}
        navigation={navigation}
      />
      <CartListItems cartList={cartList} />
      <CartTotal formattedItemsTotal={cartTotalValue} />
      <Button
        className="bg-green-500 mx-4 rounded-xl mb-1"
        onPress={handleOpenCheckout}
        testID="button-checkout"
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

interface CartListItemsProps {
  cartList: Item[];
}
const CartListItems = ({ cartList }: CartListItemsProps) => {
  return (
    <FlatList
      data={cartList}
      renderItem={({ item }) => (
        <View className="h-24">
          <CartItem item={item} />
        </View>
      )}
      testID="cart-list-items"
    />
  );
};
