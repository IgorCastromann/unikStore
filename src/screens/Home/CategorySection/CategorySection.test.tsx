import { renderWithProvider } from "@test/render";
import { CategorySection, CategoryTag } from ".";
import { fireEvent } from "@testing-library/react-native";

jest.mock("./controller", () => ({
  __esModule: true,
  default: () => ({
    uniqueCategories: ["category1", "category2"],
    selectedCategory: "category1",
    setSelectedCategory: jest.fn(),
    getCategoryClassName: jest.fn(),
    handlePress: jest.fn(),
  }),
}));

describe("<CategorySection />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the category section", () => {
    const { getByTestId } = renderWithProvider(<CategorySection />);

    expect(getByTestId("category-section")).toBeDefined();
  });

  it("renders two categories", () => {
    const { getAllByTestId } = renderWithProvider(<CategorySection />);

    expect(getAllByTestId("category-section__tag").length).toBe(2);
  });

  describe("<CategoryTag />", () => {
    it("calls handlePress when a category is pressed", () => {
      const mockHandlePress = jest.fn();

      const { getByTestId } = renderWithProvider(
        <CategoryTag
          category="category2"
          handlePress={mockHandlePress}
          selectedCategory={null}
          setSelectedCategory={jest.fn()}
        />,
      );

      const categoryTag = getByTestId("category-section__tag");

      fireEvent.press(categoryTag);

      expect(mockHandlePress).toHaveBeenCalled();
      expect(mockHandlePress).toHaveBeenCalledWith("category2");
    });
  });
});
