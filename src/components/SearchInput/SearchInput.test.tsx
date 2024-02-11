import { renderWithProvider } from "@test/render";
import { SearchInput } from ".";
import { fireEvent } from "@testing-library/react-native";

const mockSetSearch = jest.fn();

const SearchInputComponent = () =>
  renderWithProvider(<SearchInput setSearch={mockSetSearch} />);

describe("<SearchInput />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    SearchInputComponent();
  });

  it("renders the search input", () => {
    const { getByTestId } = SearchInputComponent();

    expect(getByTestId("search-input")).toBeDefined();
  });

  it("calls setSearch when input is changed", () => {
    const { getByTestId } = SearchInputComponent();

    const searchInput = getByTestId("search-input");

    fireEvent.changeText(searchInput, "test");

    expect(mockSetSearch.mock.calls.length).toBe(1);
    expect(mockSetSearch).toHaveBeenCalled();
    expect(mockSetSearch).toHaveBeenCalledWith("test");
  });
});
