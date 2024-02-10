import { Divider, HStack, Text, VStack } from "native-base";

interface CartTotalProps {
  formattedItemsTotal: string;
}
export const CartTotal = ({ formattedItemsTotal }: CartTotalProps) => {
  return (
    <VStack p={4}>
      <HStack flexGrow={1} justifyContent="space-between">
        <Text>Itens: </Text>
        <Text>{formattedItemsTotal}</Text>
      </HStack>
      <HStack flexGrow={1} justifyContent="space-between">
        <Text>Taxa de entrega</Text>
        <Text>R$ 0,00</Text>
      </HStack>
      <Divider my={1} />
      <HStack flexGrow={1} justifyContent="space-between">
        <Text fontWeight="bold">Total:</Text>
        <Text fontWeight="bold">{formattedItemsTotal}</Text>
      </HStack>
    </VStack>
  );
};
