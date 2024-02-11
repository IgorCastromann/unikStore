import { renderWithProvider } from "@test/render";
import { useItemController } from "./controller";
import { formatToBRL } from "@src/utils/formatter";
import { buildItemMock } from "@test/mocks/item";
import { ItemCard } from ".";
import { fireEvent } from "@testing-library/react-native";
import useItemStore from "@src/store/item";

const item = buildItemMock();
const controller = useItemController();

describe("<ItemCard />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the item", () => {
    const { getByTestId } = renderWithProvider(
      <ItemCard item={item} key={Math.random()} />,
    );

    expect(getByTestId("item")).toBeDefined();
  });

  it("press item and change selected item", () => {
    const { getByTestId } = renderWithProvider(
      <ItemCard item={item} key={Math.random()} />,
    );

    const initialState = useItemStore.getState().selectedItem;

    expect(initialState).toBeNull();

    const itemCard = getByTestId("item");

    fireEvent.press(itemCard);

    const afterPressState = useItemStore.getState().selectedItem;

    expect(afterPressState).toEqual(item);
  });

  describe("useItemController", () => {
    it("renders correctly with the given item", () => {
      const { getByTestId, getByText } = renderWithProvider(
        <ItemCard item={item} key={Math.random()} />,
      );

      expect(getByTestId("item")).toBeTruthy();
      expect(getByText(item.name)).toBeTruthy();
      expect(getByText(item.description)).toBeTruthy();
      expect(getByText("por uma bagatela de apenas:")).toBeTruthy();
      expect(getByText(formatToBRL(item.price))).toBeTruthy();
    });

    it("calls handleSetSelectedItem when Pressable is pressed", () => {
      const spy = jest.spyOn(controller, "handleSetSelectedItem");

      controller.handleSetSelectedItem(item);

      expect(spy.mock.calls.length).toBe(1);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(item);
    });
  });
});
