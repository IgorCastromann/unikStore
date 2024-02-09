import { Item } from "@src/@types/item";
import queries from "@src/queries";
import { UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";

interface ItemStoreState {
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  queryItems: () => UseQueryResult<Item[], Error>;
}
const useItemStore = create<ItemStoreState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item: Item | null) => {
    set({ selectedItem: item });
  },
  queryItems: queries.queryItems,
}));

export default useItemStore;
