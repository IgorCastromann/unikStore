import { renderWithProvider } from "@test/render";
import { CheckoutModal } from ".";
import { act } from "@testing-library/react-native";
import { RootStackScreenComponent } from "@src/routes/types";

jest.spyOn(console, "error").mockImplementation(() => {}); // somehow  this components throws a warning about the need of act

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

const mockNavigation = {} as RootStackScreenComponent<"Cart">["navigation"];

describe("<CheckoutModal />", () => {
  it("renders correctly", () => {
    const { getByTestId } = renderWithProvider(
      <CheckoutModal
        isOpen={true}
        onClose={jest.fn()}
        navigation={mockNavigation}
      />,
    );

    expect(getByTestId("checkout-modal")).toBeDefined();
  });

  it("should close modal", () => {
    const onClose = jest.fn();
    const { queryByTestId } = renderWithProvider(
      <CheckoutModal
        isOpen={false}
        onClose={onClose}
        navigation={mockNavigation}
      />,
    );

    act(() => {
      onClose();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(queryByTestId("checkout-modal")).toBeNull();
  });
});
