import { Center, Image, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { formatToBRL } from "@src/utils/formatter";
import useCartStore from "@src/store/cart";
import { Item } from "@src/@types/item";

interface CartItemProps {
  item: Item;
}
export const CartItem = ({ item }: CartItemProps) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <Center
      key={item.id}
      className="flex-1  py-2 px-4 m-2 rounded text-center flex-row justify-between border-b-2 border-gray-200 bg-white"
    >
      <Image
        size={"sm"}
        rounded="lg"
        source={{
          uri: item.image,
        }}
        alt={item.name}
      />
      <Center>
        <Text>{item.name}</Text>
        <Text fontWeight="bold">{formatToBRL(+item.price)}</Text>
      </Center>
      <AntDesign
        name="closecircleo"
        size={24}
        color="#f46767"
        onPress={() => {
          removeFromCart(item.id);
        }}
      />
    </Center>
  );
};
