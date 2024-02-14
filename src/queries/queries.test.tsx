import { useMutation, useQuery } from "@tanstack/react-query";
import queries from ".";
import { renderHook, waitFor } from "@testing-library/react-native";
import { buildItemsArrayMock } from "@test/mocks/item";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

const mockRemoveItem = jest.fn();
const mockCheckoutItems = jest.fn();
jest.mock("@src/service/items", () => ({
  ...jest.requireActual("@src/service/items"),
  getItems: () => mockItems,
  removeItem: () => true,
  checkoutItems: () => true,
}));

const mockItems = buildItemsArrayMock(2);

describe("queries", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should query items", async () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockItems });

    const { result } = renderHook(() => queries.queryItems());

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockItems);
  });

  it("should delete item", async () => {
    const mockItem = mockItems[0];
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockRemoveItem,
    });

    const { result } = renderHook(() => queries.deleteItem());
    await result.current.mutate(mockItem);

    expect(mockRemoveItem).toHaveBeenCalledWith(mockItem);
  });

  it("should checkout items", async () => {
    const mockItemsToCheckout = [mockItems[0]];
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockCheckoutItems,
    });

    const { result } = renderHook(() => queries.checkoutItems());
    await result.current.mutate(mockItemsToCheckout);

    expect(mockCheckoutItems).toHaveBeenCalledWith(mockItemsToCheckout);
  });
});
