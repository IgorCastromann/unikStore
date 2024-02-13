import { act, renderHook } from "@testing-library/react-native";
import useCartStore from "./cart";
import { buildItemsArrayMock } from "@test/mocks/item";

const mockItems = buildItemsArrayMock(3);
const initialCartStoreState = useCartStore.getState();

describe("useCartStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCartStore.setState(initialCartStoreState, true);
  });

  it("addToCart", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockItems[0]);
    });

    expect(result.current.cartList).toHaveLength(1);
    expect(result.current.cartList[0].name).toBe("item-0");
  });

  it("removeFromCart", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockItems[0]);
      result.current.addToCart(mockItems[1]);
      result.current.removeFromCart(1);
    });

    expect(result.current.cartList).toHaveLength(1);
    expect(result.current.cartList[0].name).toBe("item-0");
  });

  it("checkoutCart", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockItems[0]);
      result.current.addToCart(mockItems[1]);
      result.current.checkoutCart();
    });

    expect(result.current.cartList).toHaveLength(0);
  });

  it("hasCartItems to be true", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart(mockItems[0]);
    });

    expect(result.current.hasCartItems()).toBeTruthy();
  });

  it("hasCartItems to be false", () => {
    const { result } = renderHook(() => useCartStore());

    expect(result.current.hasCartItems()).toBeFalsy();
  });
});
