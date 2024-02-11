import useCartStore from "@src/store/cart";
import { Badge, Pressable, VStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";

interface RenderBadgeProps {
  totalCartItems: number;
  icon: JSX.Element;
}

interface CartIconProps {
  navigateToCart: () => void;
}
export const CartIcon = ({ navigateToCart }: CartIconProps) => {
  const totalCartItems = useCartStore((state) => state.getTotalCartItems());

  const renderIcon = () => (
    <AntDesign name="shoppingcart" size={24} onPress={navigateToCart} />
  );

  const renderBadge = ({ totalCartItems, icon }: RenderBadgeProps) => (
    <Pressable onPress={navigateToCart} mb={2}>
      <Badge
        colorScheme="danger"
        rounded="full"
        mb={-4}
        mr={-4}
        zIndex={1}
        variant="solid"
        alignSelf="flex-end"
        _text={{
          fontSize: 12,
        }}
      >
        {totalCartItems}
      </Badge>
      {icon}
    </Pressable>
  );

  return (
    <VStack className="mr-1">
      <ConditionalWrapper
        condition={totalCartItems > 0}
        wrapper={() => renderBadge({ totalCartItems, icon: renderIcon() })}
        children={renderIcon()}
      />
    </VStack>
  );
};

interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
}
const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => {
  return condition ? wrapper(children) : children;
};
