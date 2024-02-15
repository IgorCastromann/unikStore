import { IToastService } from "native-base/lib/typescript/components/composites/Toast";
import { NavigationRoutes } from "@src/routes/types";
import useCartStore from "@src/store/cart";
import { useItemDetailsModalController } from "./controller";
import { buildItemMock } from "@test/mocks/item";
import { act, renderHook } from "@testing-library/react-native";

jest.mock("@src/store/cart", () => ({
  __esModule: true,
  default: {
    getState: jest.fn(),
  },
}));

const mockNavigation = {
  navigate: jest.fn(),
} as NavigationRoutes & { navigate: jest.Mock };
const mockToastService = {
  show: jest.fn(),
} as IToastService & { show: jest.Mock };
const mockItem = buildItemMock();

describe("useItemDetailsModalController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("setModalVisibility", () => {
    const { result } = renderHook(() => useItemDetailsModalController());

    act(() => {
      result.current.setModalVisibility(true);
    });
    expect(result.current.modalVisible).toBe(true);

    act(() => {
      result.current.setModalVisibility(false);
    });
    expect(result.current.modalVisible).toBe(false);
  });

  it("handleAddToCart", () => {
    (useCartStore.getState as jest.Mock).mockReturnValue({
      addToCart: jest.fn(),
      cartList: [],
    });

    const { result } = renderHook(() => useItemDetailsModalController());

    act(() => {
      result.current.handleAddToCart({
        item: mockItem,
        toast: mockToastService,
        alreadyInCart: false,
      });
    });

    expect(mockToastService.show).toHaveBeenCalledWith({
      placement: "top",
      render: expect.any(Function),
    });

    expect(useCartStore.getState().addToCart).toHaveBeenCalledWith(mockItem);
  });

  it("handleRemoveItemFromCart", () => {
    (useCartStore.getState as jest.Mock).mockReturnValue({
      removeFromCart: jest.fn(),
      cartList: [mockItem],
    });

    const { result } = renderHook(() => useItemDetailsModalController());

    act(() => {
      result.current.handleRemoveItemFromCart(mockItem.id, mockToastService);
    });

    expect(mockToastService.show).toHaveBeenCalledWith({
      placement: "top",
      render: expect.any(Function),
    });

    expect(useCartStore.getState().removeFromCart).toHaveBeenCalledWith(
      mockItem.id,
    );
  });

  it("handleNavigateToCart", () => {
    const { result } = renderHook(() => useItemDetailsModalController());

    act(() => {
      result.current.handleNavigateToCart(mockNavigation);
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Cart");
  });

  it("hasItemInCart", () => {
    (useCartStore.getState as jest.Mock).mockReturnValue({
      cartList: [mockItem],
    });

    const { result } = renderHook(() => useItemDetailsModalController());

    expect(result.current.hasItemInCart(mockItem.id)).toBe(true);
  });

  it("should return null if item is not defined", () => {
    const { result } = renderHook(() => useItemDetailsModalController());

    expect(result.current.modalVisible).toBe(false);
  });

  it("display toast if item is already in cart", () => {
    const { result } = renderHook(() => useItemDetailsModalController());

    act(() => {
      result.current.handleAddToCart({
        item: mockItem,
        toast: mockToastService,
        alreadyInCart: true,
      });
    });

    expect(mockToastService.show).toHaveBeenCalledWith({
      placement: "top",
      render: expect.any(Function),
    });
  });
});
