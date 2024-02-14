import { Item } from "@src/@types/item";

export const buildItemMock = (id = "1"): Item => ({
  id,
  name: `item-${id}`,
  price: 10,
  quantity: 1,
  image: "",
  description: "description",
  category: `category${id}`,
});

export const buildItemsArrayMock = (length: number): Item[] =>
  [...Array(length)].map((_, i) => buildItemMock(i.toString()));
