import { Item } from "@src/@types/item";
import { ItemCard } from "../ItemCard";
import { FlatList } from "native-base";

interface ItemListProps {
  items: Item[];
}
export const ItemList = ({ items }: ItemListProps) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <ItemCard item={item} />}
    />
  );
};
