import useItemStore from "@src/store/item";

export const useHomeController = () => {
  const queryItems = useItemStore((state) => state.queryItems);
  const selectedItem = useItemStore((state) => state.selectedItem);
  const getFilteredItems = useItemStore((state) => state.getFilteredItems);

  const handleGetFilteredItems = () => {
    return getFilteredItems();
  };

  return {
    queryItems,
    selectedItem,
    handleGetFilteredItems,
  };
};
