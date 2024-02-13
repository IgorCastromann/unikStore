import { act, fireEvent, renderHook } from "@testing-library/react-native";
import useCheckoutFormController from "./controller";
import { renderWithProvider } from "@test/render";
import { CheckoutForm } from ".";

describe("<CheckoutForm />", () => {
  it("find submit button on validaded state", () => {
    const { getByTestId, queryByText } = renderWithProvider(<CheckoutForm />);
    const { result } = renderHook(() => useCheckoutFormController());

    act(() => {
      const cvv = getByTestId("cvv");
      fireEvent.changeText(cvv, "123");
    });

    const submitButton = queryByText(
      `Pagar R$ ${result.current.totalCartValue}`,
    );

    expect(submitButton).toBeDefined();
  });

  describe("useCheckouFormController", () => {
    it("handleCheckout", () => {
      const { result } = renderHook(() => useCheckoutFormController());

      const spy = jest.spyOn(result.current, "handleCheckout");

      act(() => {
        result.current.handleCheckout();
      });

      expect(spy.mock.calls.length).toBe(1);
    });
  });
});
