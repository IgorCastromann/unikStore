import { RootStackScreenComponent } from "@src/routes/types";
import { ItemDetailsModal } from ".";
import { useItemDetailsModalController } from "./controller";
import useCartStore from "@src/store/cart";
import { buildItemMock } from "@test/mocks/item";
import { renderWithProvider } from "@test/render";

const mockNavigation = {} as RootStackScreenComponent<"Home">["navigation"];
const mockToast = {
  show: jest.fn(),
};

const initialCartStoreState = useCartStore.getState();
const initialItemDetailsModalControllerState =
  useItemDetailsModalController.getState();

const item = buildItemMock();

const getCartlist = () => useCartStore.getState().cartList;
const getModalVisible = () =>
  useItemDetailsModalController.getState().modalVisible;

describe("<ItemDetailsModal />", () => {
  it("renders the item name and description", () => {
    const { getByText } = renderWithProvider(
      <ItemDetailsModal navigation={mockNavigation} item={item} />,
    );

    expect(getByText(item.name)).toBeDefined();
    expect(getByText(item.description)).toBeDefined();
  });

  describe("ItemDetailsModalController", () => {
    const { handleAddToCart, hasItemInCart, setModalVisibility } =
      useItemDetailsModalController.getState();
    const { addToCart } = useCartStore.getState();

    beforeEach(() => {
      useCartStore.setState(initialCartStoreState, true);
      useItemDetailsModalController.setState(
        initialItemDetailsModalControllerState,
        true,
      );
      jest.clearAllMocks();
    });

    describe("handleAddToCart", () => {
      it("should add a item to cart", async () => {
        expect(getCartlist().length).toEqual(0);

        handleAddToCart({
          item,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          toast: mockToast as any,
          alreadyInCart: false,
        });

        expect(getCartlist().length).toEqual(1);
      });
    });
    describe("Toggle Modal visibility", () => {
      it("should set modal visibility to true then false", () => {
        setModalVisibility(true);
        expect(getModalVisible()).toBeTruthy();

        setModalVisibility(false);
        expect(getModalVisible()).toBeFalsy();
      });
    });
    describe("hasIteminCart", () => {
      it("should check if there is a item in cart", () => {
        addToCart(item);

        expect(hasItemInCart).toBeTruthy();
      });
    });
  });
});
