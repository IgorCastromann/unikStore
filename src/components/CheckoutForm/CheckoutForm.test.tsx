import { act, renderHook } from "@testing-library/react-native";
import useCheckoutFormController from "./controller";
import { RootStackScreenComponent } from "@src/routes/types";
import * as ReactQuery from "@tanstack/react-query";
import { renderWithProvider } from "@test/render";
import { CheckoutForm } from ".";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query",
  );

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

describe("<CheckoutForm />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the checkout form initial state", () => {
    const { getByTestId, getByText } = renderWithProvider(
      <CheckoutForm navigation={mockNavigation} />,
    );

    const AddressSection = getByTestId("address-section");
    const cvv = getByTestId("cvv");
    const submitPaymentButton = getByTestId("submit-payment-button");
    const invalidCardText = getByText("Invalid card");

    expect(AddressSection).toBeDefined();
    expect(cvv).toBeDefined();
    expect(submitPaymentButton).toBeDefined();
    expect(invalidCardText).toBeDefined();
    expect(submitPaymentButton.props.accessibilityState.disabled).toBe(true);
  });

  describe("useCheckouFormController", () => {
    it("handleCheckout", () => {
      const { result } = renderHook(() => useCheckoutFormController());

      const spy = jest.spyOn(result.current, "handleCheckout");

      act(() => {
        result.current.handleCheckout(mockNavigation);
      });

      expect(spy.mock.calls.length).toBe(1);
    });
  });
});
