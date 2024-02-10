import {
  Actionsheet,
  Center,
  Divider,
  Heading,
  HStack,
  IButtonProps,
  Text,
  useToast,
} from "native-base";
import { useItemDetailsModalController } from "./controller";
import { Item } from "@src/@types/item";
import { ActionButton } from "../shared/ActionButton";
import { NavigationRoutes } from "@src/routes/types";

interface ItemDetailModalProps {
  item: Item;
  navigation: NavigationRoutes | undefined;
}
export const ItemDetailsModal = ({
  item,
  navigation,
}: ItemDetailModalProps) => {
  const modalVisible = useItemDetailsModalController(
    (state) => state.modalVisible,
  );
  const setModalVisibility = useItemDetailsModalController(
    (state) => state.setModalVisibility,
  );
  const handleAddToCart = useItemDetailsModalController(
    (state) => state.handleAddToCart,
  );
  const hasItemInCart = useItemDetailsModalController(
    (state) => state.hasItemInCart,
  );
  const handleRemoveItemFromCart = useItemDetailsModalController(
    (state) => state.handleRemoveItemFromCart,
  );

  const toast = useToast();

  if (!item) return null;

  return (
    <Actionsheet
      isOpen={modalVisible}
      onClose={() => setModalVisibility(false)}
      height="full"
    >
      <Actionsheet.Content>
        <HeaderDetails name={item.name} />
        <Divider borderColor="gray.300" />
        <BodyDetails description={item.description ?? ""} />
        <ActionDetails
          handleAddToCart={() =>
            handleAddToCart({
              item,
              toast,
              alreadyInCart: hasItemInCart(item.id),
            })
          }
          hasItemInCart={hasItemInCart(item.id)}
          removeItemFromCart={() => handleRemoveItemFromCart(item.id, toast)}
          navigateToCart={() => navigation?.navigate("Cart")}
        />
      </Actionsheet.Content>
    </Actionsheet>
  );
};

interface ItemHeaderProps {
  name: string;
}
const HeaderDetails = ({ name }: ItemHeaderProps) => (
  <Center>
    <Heading mb={2} mt={2}>
      {name}
    </Heading>
  </Center>
);

interface BodyDetailsProps {
  description: string;
}
const BodyDetails = ({ description }: BodyDetailsProps) => (
  <Actionsheet.Item>
    <Text className="text-justify">
      {"  "}
      {description}
    </Text>
  </Actionsheet.Item>
);

interface ActionDetailsProps {
  handleAddToCart: () => void;
  hasItemInCart: boolean;
  removeItemFromCart: () => void;
  navigateToCart: () => void;
}
const ActionDetails = ({
  handleAddToCart,
  hasItemInCart,
  removeItemFromCart,
  navigateToCart,
}: ActionDetailsProps) => (
  <Actionsheet.Item>
    <HStack className="w-full justify-center">
      {hasItemInCart ? (
        <HStack>
          <RemoveItemFromCart onPress={removeItemFromCart} />
          <GoToCart onPress={navigateToCart} />
        </HStack>
      ) : (
        <AddItemToCart onPress={handleAddToCart} />
      )}
    </HStack>
  </Actionsheet.Item>
);

const AddItemToCart = ({ onPress }: IButtonProps) => {
  return (
    <ActionButton
      bgColor="green.500"
      rounded="xl"
      width="90%"
      onPress={onPress}
    >
      Adicionar no carrinho
    </ActionButton>
  );
};

const GoToCart = ({ onPress }: IButtonProps) => {
  return (
    <ActionButton
      bgColor="green.500"
      onPress={onPress}
      opacity={0.75}
      px={6}
      width="45%"
    >
      <Text className="text-white">Ir para o carrinho</Text>
    </ActionButton>
  );
};

const RemoveItemFromCart = ({ onPress }: IButtonProps) => {
  return (
    <ActionButton
      bgColor="red.500"
      onPress={onPress}
      opacity={0.75}
      width="45%"
      px={0}
    >
      <Text className="text-white">Remover do carrinho</Text>
    </ActionButton>
  );
};
