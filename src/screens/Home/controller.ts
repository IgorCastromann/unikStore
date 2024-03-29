import useItemStore from "@src/store/item";

export const useHomeController = () => {
  const queryItems = useItemStore((state) => state.queryItems);
  const selectedCategory = useItemStore((state) => state.selectedCategory);
  const selectedItem = useItemStore((state) => state.selectedItem);
  const getFilteredItems = useItemStore((state) => state.getFilteredItems);
  const search = useItemStore((state) => state.search);

  const handleGetFilteredItems = () => {
    return getFilteredItems(selectedCategory, search);
  };

  return {
    queryItems,
    selectedItem,
    handleGetFilteredItems,
  };
};
