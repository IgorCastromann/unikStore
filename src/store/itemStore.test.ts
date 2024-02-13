import { act, renderHook } from "@testing-library/react-native";
import useItemStore from "./item";
import { buildItemsArrayMock } from "@test/mocks/item";
import { Item } from "@src/@types/item";

const mockItems = buildItemsArrayMock(3);

jest.mock("@tanstack/react-query", () => {
  const buildItemMock = (id = 1): Item => ({
    id,
    name: `item-${id}`,
    price: 10,
    quantity: 1,
    image: "",
    description: "description",
    category: `category${id}`,
  });

  const mockItems = [...Array(3)].map((_, i) => buildItemMock(i));

  return {
    useQuery: jest.fn().mockReturnValue({
      data: mockItems,
      isLoading: false,
      error: {},
      isSuccess: true,
    }),
  };
});

const initialItemStoreState = useItemStore.getState();

describe("useItemStore", () => {
  afterEach(() => {
    jest.clearAllMocks();
    act(() => {
      useItemStore.setState(initialItemStoreState, true);
    });
  });

  it("setSelectedItem", () => {
    const { result } = renderHook(() => useItemStore());

    act(() => {
      result.current.setSelectedItem(mockItems[0]);
    });

    expect(result.current.selectedItem?.name).toBe("item-0");
  });

  it("queryItems", async () => {
    const { result } = renderHook(() => useItemStore());

    expect(result.current.queryItems().data).toHaveLength(3);
  });

  it("getCategories", () => {
    const { result } = renderHook(() => useItemStore());

    expect(result.current.getCategories()).toEqual([
      "category0",
      "category1",
      "category2",
    ]);
  });

  it("should set selected category", () => {
    const { result } = renderHook(() => useItemStore());

    act(() => {
      result.current.setSelectedCategory("Category 1");
    });

    expect(result.current.selectedCategory).toBe("Category 1");
  });

  it("should get filtered items", () => {
    const { result } = renderHook(() => useItemStore());

    act(() => {
      result.current.setSearch("item-0");
    });

    expect(result.current.getFilteredItems(null, "item-0")).toHaveLength(1);
  });

  it("should set search", () => {
    const { result } = renderHook(() => useItemStore());

    act(() => {
      result.current.setSearch("Item");
    });

    expect(result.current.search).toBe("Item");
  });
});
