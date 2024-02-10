import { Image, VStack, Text, HStack, Pressable } from "native-base";
import { Item } from "@src/@types/item";
import { formatToBRL } from "@src/utils/formatter";
import { useItemController } from "./controller";

interface ItemProps {
  item: Item;
}
export const ItemCard = ({ item }: ItemProps) => {
  const { handleSetSelectedItem } = useItemController();

  return (
    <Pressable
      onPress={() => {
        handleSetSelectedItem(item);
      }}
      key={item.id}
      className="w-[inherit]  rounded-xl mx-4 my-[.125rem] border-2 border-gray-200 mb-1"
      testID="item"
    >
      <HStack className="rounded-xl px-2 align-middle justify-center">
        <Image
          size="xl"
          rounded="lg"
          resizeMode="contain"
          source={{
            uri: item.image,
          }}
          alt={`${item.name}`}
          className="mr-4 my-[auto]"
        />
        <VStack
          padding={1}
          rounded="lg"
          justifyContent="space-between"
          className="flex-1"
        >
          <Text className="font-bold self-center">{item.name}</Text>
          <Text className="self-center text-justify">
            {"  "}
            {item.description}
          </Text>
          <PriceSection price={formatToBRL(Number(item.price))} />
        </VStack>
      </HStack>
    </Pressable>
  );
};

interface PriceSectionProps {
  price: string;
}
const PriceSection = ({ price }: PriceSectionProps) => (
  <VStack className="justify-end mt-4">
    <Text fontSize="xs" lineHeight="md" alignSelf="flex-end" px={4}>
      por uma bagatela de apenas:
    </Text>
    <Text
      fontSize="sm"
      fontWeight="bold"
      lineHeight="md"
      alignSelf="flex-end"
      px={4}
    >
      {price}
    </Text>
  </VStack>
);
