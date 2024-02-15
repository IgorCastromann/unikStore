import { fireEvent } from "@testing-library/react-native";
import { AdressSection } from ".";
import { renderWithProvider } from "@test/render";

const inputValues = {
  name: "bro",
  email: "bro@bro.com",
  address: "Bro land",
};

describe("<AdressSection />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId } = renderWithProvider(<AdressSection />);
    const addressSection = getByTestId("address-section");

    expect(addressSection).toBeDefined();
  });

  it("updates input change", () => {
    const { getByPlaceholderText } = renderWithProvider(<AdressSection />);
    const nameInput = getByPlaceholderText("Nome");
    const emailInput = getByPlaceholderText("Email");
    const addressInput = getByPlaceholderText("Endereço");

    fireEvent.changeText(nameInput, inputValues.name);
    fireEvent.changeText(emailInput, inputValues.email);
    fireEvent.changeText(addressInput, inputValues.address);

    expect(nameInput.props.value).toBe(inputValues.name);
    expect(emailInput.props.value).toBe(inputValues.email);
    expect(addressInput.props.value).toBe(inputValues.address);
  });

  it("input initial states should be error", () => {
    const { getAllByText } = renderWithProvider(<AdressSection />);

    const [nameErrorMessage, emailErrorMessage, addressErrorMessage] =
      getAllByText("Campo obrigatório");

    expect(nameErrorMessage).toBeDefined();
    expect(emailErrorMessage).toBeDefined();
    expect(addressErrorMessage).toBeDefined();
  });

  it("error must disapear if inputs has valid values", () => {
    const { getByPlaceholderText, queryByText } = renderWithProvider(
      <AdressSection />,
    );
    const nameInput = getByPlaceholderText("Nome");
    const emailInput = getByPlaceholderText("Email");
    const addressInput = getByPlaceholderText("Endereço");

    // Fill inputs
    fireEvent.changeText(nameInput, inputValues.name);
    fireEvent.changeText(emailInput, inputValues.email);
    fireEvent.changeText(addressInput, inputValues.address);

    // Find error messages
    const nameErrorMessage = queryByText("Campo obrigatório");
    const emailErrorMessage = queryByText("Campo obrigatório");
    const addressErrorMessage = queryByText("Campo obrigatório");

    expect(nameErrorMessage).toBeNull();
    expect(emailErrorMessage).toBeNull();
    expect(addressErrorMessage).toBeNull();
  });
});
