import { act, fireEvent } from "@testing-library/react-native";
import { renderWithProvider } from "@test/render";
import { CardSectionForm } from ".";

const mockSetIsValid = jest.fn();
jest.spyOn(console, "info").mockImplementation(() => {}); // disable library logs

describe("<CardSectionForm />", () => {
  it("find submit button on validaded state", () => {
    const { getByTestId } = renderWithProvider(
      <CardSectionForm publicKey="" setIsValid={mockSetIsValid} />,
    );

    act(() => {
      const cvv = getByTestId("cvv");
      fireEvent.changeText(cvv, "123");
    });

    expect(mockSetIsValid).toHaveBeenCalledWith(true);
  });
});
