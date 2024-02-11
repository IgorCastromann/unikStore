import { Item } from "@src/@types/item";
import queries from "@src/queries";
import { UseQueryResult } from "@tanstack/react-query";
import { create } from "zustand";

interface ItemStoreState {
  selectedItem: Item | null;
  selectedCategory: string | null;
  search: string;
  setSelectedItem: (item: Item | null) => void;
  queryItems: () => UseQueryResult<Item[], Error>;
  getCategories: () => string[];
  setSelectedCategory: (category: string | null) => void;
  getFilteredItems: (category: string | null, search: string) => Item[];
  setSearch: (search: string) => void;
}
const useItemStore = create<ItemStoreState>((set, get) => ({
  selectedItem: null,
  selectedCategory: null,
  search: "",
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
  getFilteredItems: (category: string | null, search: string) => {
    const items = get().queryItems().data;

    if (!items) return [];

    const filteredItems = items.filter((item) => {
      const productName = item.name.toLowerCase();
      const isInCategory = !category || item.category === category;
      const matchesSearch =
        !search || productName.includes(search.toLowerCase());
      return isInCategory && matchesSearch;
    });

    return filteredItems;
  },
  setSearch: (search: string) => {
    set({ search });
  },
}));

useItemStore.subscribe((state, prev) => {
  console.log("State changed", state, prev);
  return state.search;
});

export default useItemStore;
