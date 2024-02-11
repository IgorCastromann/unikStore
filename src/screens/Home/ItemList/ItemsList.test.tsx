import { renderWithProvider } from "@test/render";
import { ItemList } from ".";
import { buildItemsArrayMock } from "@test/mocks/item";

describe("<ItemsList />", () => {
  it("renders the items list", () => {
    const { getByTestId } = renderWithProvider(<ItemList items={[]} />);
    expect(getByTestId("items-list")).toBeDefined();
  });

  it("render two items", () => {
    const { getAllByTestId } = renderWithProvider(
      <ItemList items={buildItemsArrayMock(2)} />,
    );

    expect(getAllByTestId("item").length).toBe(2);
  });
});
