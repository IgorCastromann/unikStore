import Home from ".";
import { RootStackScreenComponent } from "@src/routes/types";
import * as ControllerModule from "./controller";
import { UseQueryResult } from "@tanstack/react-query";
import { buildItemsArrayMock } from "@test/mocks/item";
import { Item } from "@src/@types/item";
import { renderWithProvider } from "@test/render";

const mockNavigation = {} as RootStackScreenComponent<"Home">["navigation"];

const items = buildItemsArrayMock(3);

// The order affects the test results
jest
  .spyOn(ControllerModule, "useHomeController")
  .mockImplementationOnce(() => ({
    selectedItem: items[0],
    queryItems: () =>
      ({
        data: undefined,
        isLoading: true,
        error: null,
      }) as UseQueryResult<Item[], Error>,
    handleGetFilteredItems: jest.fn(),
  }))
  .mockImplementationOnce(() => ({
    selectedItem: items[0],
    queryItems: () =>
      ({
        data: undefined,
        isLoading: false,
        error: {
          message: "Mocked error",
        },
      }) as UseQueryResult<Item[], Error>,
    handleGetFilteredItems: jest.fn(),
  }))
  .mockImplementationOnce(() => ({
    selectedItem: items[0],
    queryItems: () =>
      ({
        data: items,
        isLoading: false,
        error: null,
      }) as UseQueryResult<Item[], Error>,
    handleGetFilteredItems: jest.fn(),
  }))
  .mockImplementationOnce(() => ({
    selectedItem: null,
    queryItems: () =>
      ({
        data: items,
        isLoading: false,
        error: null,
      }) as UseQueryResult<Item[], Error>,
    handleGetFilteredItems: () => items,
  }));

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with loading state", async () => {
    const { getByTestId, queryByTestId } = renderWithProvider(
      <Home navigation={mockNavigation} />,
    );

    const Spin = getByTestId("spin");
    const ItemsList = queryByTestId("items-list");

    expect(Spin).toBeDefined();
    expect(ItemsList).toBeNull();
  });

  it("renders correctly with error state", async () => {
    const { getByTestId } = renderWithProvider(
      <Home navigation={mockNavigation} />,
    );

    const Error = getByTestId("error");

    expect(Error).toBeTruthy();
  });

  it("renders correctly with no error and no loading state", async () => {
    const { getByTestId } = renderWithProvider(
      <Home navigation={mockNavigation} />,
    );

    const ItemsList = getByTestId("items-list");

    expect(ItemsList).toBeTruthy();
  });

  describe("useHomeController", () => {
    it("handleGetFilteredItems", () => {
      const controller = ControllerModule.useHomeController();

      const filteredItems = controller.handleGetFilteredItems();

      expect(filteredItems).toEqual(items);
    });
  });
});
