import { Item } from "@src/@types/item";
import queries from "@src/queries";
import { UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";

interface ItemStoreState {
  selectedItem: Item | null;
  selectedCategory: string | null;
  setSelectedItem: (item: Item | null) => void;
  queryItems: () => UseQueryResult<Item[], Error>;
  getCategories: () => string[];
  setSelectedCategory: (category: string | null) => void;
  getFilteredItems: () => Item[];
}
const useItemStore = create<ItemStoreState>((set, get) => ({
  selectedItem: null,
  selectedCategory: null,
  setSelectedItem: (item: Item | null) => {
    set({ selectedItem: item });
  },
  queryItems: queries.queryItems,
  getCategories: () => {
    const items = get().queryItems().data;
    if (!items) return [];

    const uniqueCategories = new Set(items.map((item) => item.category));

    return Array.from(uniqueCategories);
  },
  setSelectedCategory: (category: string | null) => {
    set({ selectedCategory: category });
  },
  getFilteredItems: () => {
    const items = get().queryItems().data;

    const category = get().selectedCategory;

    if (!items) return [];

    return category
      ? items.filter((item) => item.category === category)
      : items;
  },
}));

useItemStore.subscribe((state) => state.selectedCategory);
useItemStore.subscribe((state) => state.selectedItem);

export default useItemStore;
