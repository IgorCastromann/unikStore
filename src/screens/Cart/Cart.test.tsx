import { renderWithProvider } from "@test/render";
import Cart from ".";
import useCartStore from "@src/store/cart";
import * as ControllerModule from "./controller";
import { formatToBRL } from "@src/utils/formatter";
import { buildItemsArrayMock } from "@test/mocks/item";
import {
  act,
  fireEvent,
  renderHook,
  waitFor,
} from "@testing-library/react-native";

const cartTotal = jest.fn();
const mockCartTotalValue = "R$ 10,00";
const initialCartStoreState = useCartStore.getState();

jest.spyOn(console, "error").mockImplementation(() => {}); // somehow  this components throws a warning about the need of act

jest
  .spyOn(useCartStore.getState(), "hasCartItems")
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true);

jest
  .spyOn(ControllerModule, "useCartController")
  .mockReturnValueOnce({
    cartTotal,
    handleOpenCheckout: jest.fn(),
    handleCloseCheckout: jest.fn(),
    isModalOpen: true,
  })
  .mockImplementationOnce(() => ({
    cartTotal: () => mockCartTotalValue,
    handleOpenCheckout: jest.fn(),
    handleCloseCheckout: jest.fn(),
    isModalOpen: false,
  }));

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");

  return {
    ...original,
    useMutation: () => ({
      mutate: jest.fn(),
      isLoading: false,
      error: {},
    }),
  };
});

const insetProductsToCart = (n: number) => {
  const mockCartList = buildItemsArrayMock(n);

  const addToCart = useCartStore.getState().addToCart;
  for (const item of mockCartList) {
    act(() => {
      addToCart(item);
    });
  }

  const totalValue = mockCartList.reduce((prev, cur) => prev + +cur.price, 0);

  return { totalValue };
};

describe("<Cart />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCartStore.setState(initialCartStoreState, true);
  });

  it("renders empty cart", () => {
    const { getByTestId } = renderWithProvider(<Cart />);
    expect(getByTestId("empty-cart")).toBeDefined();
  });

  it("renders extra carts", async () => {
    const { getByTestId, getAllByText } = renderWithProvider(<Cart />);

    const { totalValue } = insetProductsToCart(3);

    const mockValue = formatToBRL(totalValue);

    expect(getByTestId("button-checkout")).toBeDefined();
    expect(getAllByText(mockValue)).toBeDefined();
  });

  it("should press button checkout", async () => {
    const useCartController = ControllerModule.useCartController;
    const { result } = renderHook(() => useCartController());

    insetProductsToCart(1);

    const { getByTestId } = renderWithProvider(<Cart />);

    act(() => {
      fireEvent.press(getByTestId("button-checkout"));
    });

    await waitFor(() => {
      expect(result.current.isModalOpen).toBe(true);
    });
  });

  describe("<CartListItems />", () => {
    it("renders correctly with two items", () => {
      insetProductsToCart(2);
      const { getAllByTestId } = renderWithProvider(<Cart />);

      const cartItems = getAllByTestId("cart-item");

      expect(cartItems.length).toBe(2);
      expect(useCartStore.getState().cartList.length).toBe(2);
    });
  });
});
