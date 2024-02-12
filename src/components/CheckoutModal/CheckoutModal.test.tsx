import { renderWithProvider } from "@test/render";
import { CheckoutModal } from ".";

describe("<CheckoutModal />", () => {
  it("renders correctly", () => {
    const { getByTestId } = renderWithProvider(
      <CheckoutModal isOpen={true} onClose={jest.fn()} />,
    );

    expect(getByTestId("checkout-modal")).toBeDefined();
  });

  it("should close modal", () => {
    const onClose = jest.fn();
    const { queryByTestId } = renderWithProvider(
      <CheckoutModal isOpen={false} onClose={onClose} />,
    );

    onClose();

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(queryByTestId("checkout-modal")).toBeNull();
  });
});
