import { renderWithProvider } from "@test/render";
import { CartItem } from ".";
import { formatToBRL } from "@src/utils/formatter";
import useCartStore from "@src/store/cart";
import { act, fireEvent, waitFor } from "@testing-library/react-native";
import { buildItemMock } from "@test/mocks/item";

const mockItem = buildItemMock();

describe("<CartItem />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { getByText } = renderWithProvider(<CartItem item={mockItem} />);

    const itemName = getByText(mockItem.name);
    const itemPrice = getByText(formatToBRL(mockItem.price));

    expect(itemName).toBeDefined();
    expect(itemPrice).toBeDefined();
  });

  it("should call removeFromCart when close button is pressed", async () => {
    const { getByTestId } = renderWithProvider(<CartItem item={mockItem} />);

    const spy = jest.spyOn(useCartStore.getState(), "removeFromCart");

    const RemoveFromCartButton = getByTestId("remove-from-cart-button");

    act(() => {
      fireEvent.press(RemoveFromCartButton);
    });
    RemoveFromCartButton.props.onPress(mockItem.id);

    await waitFor(() => {
      expect(spy.mock.calls.length).toBe(1);
      expect(spy).toHaveBeenCalledWith(mockItem.id);
    });
  });
});
