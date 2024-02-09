import useItemStore from "@src/store/item";
import { Item } from "@src/@types/item";
import { useItemDetailsModalController } from "@src/components/ItemDetailsModal/controller";

export const useItemController = () => {
  const setSelectedItem = useItemStore.getState().setSelectedItem;
  const setModalVisibility =
    useItemDetailsModalController.getState().setModalVisibility;

  const handleSetSelectedItem = (item: Item) => {
    setSelectedItem(item);
    setModalVisibility(true);
  };

  return {
    handleSetSelectedItem,
  };
};
