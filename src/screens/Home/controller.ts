import useItemStore from "@src/store/item";

export const useHomeController = () => {
  const queryItems = useItemStore((state) => state.queryItems);
  const selectedItem = useItemStore((state) => state.selectedItem);

  return {
    queryItems,
    selectedItem,
  };
};
