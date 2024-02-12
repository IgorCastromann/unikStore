import { renderWithProvider } from "@test/render";
import { CartTotal } from ".";
import { formatToBRL } from "@src/utils/formatter";

const mockTotalValue = formatToBRL(100);

describe("<CartTotal />", () => {
  it("renders correctly", () => {
    const { getByText, findAllByText } = renderWithProvider(
      <CartTotal formattedItemsTotal={mockTotalValue} />,
    );

    expect(getByText("Total:")).toBeDefined();
    expect(getByText("Taxa de entrega")).toBeDefined();
    expect(findAllByText(mockTotalValue)).toBeDefined();
  });
});
