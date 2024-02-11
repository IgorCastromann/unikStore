import { SearchInput } from "../SearchInput";
import { CartIcon } from "../CartIcon";
import { NavigationRoutes } from "@src/routes/types";
import useItemStore from "@src/store/item";

interface HeaderProps {
  navigation: NavigationRoutes;
}
export const HeaderLeft = () => {
  const setSearch = useItemStore((state) => state.setSearch);

  return <SearchInput setSearch={setSearch} />;
};

export const HeaderRight = ({ navigation }: HeaderProps) => {
  return (
    <CartIcon
      navigateToCart={() => {
        navigation.navigate("Cart");
      }}
    />
  );
};
