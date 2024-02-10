import useItemStore from "@src/store/item";

const useCategorySectionController = () => {
  const uniqueCategories = useItemStore((state) => state.getCategories());
  const selectedCategory = useItemStore((state) => state.selectedCategory);
  const setSelectedCategory = useItemStore(
    (state) => state.setSelectedCategory,
  );

  const getCategoryClassName = (category: string) => {
    return `mr-3 mb-2 px-3 pt-1 pb-2 border rounded ${isCategorySelected(category) ? "border-cyan-500 " : "border-black"}`;
  };

  const handlePress = (category: string) => {
    isCategorySelected(category)
      ? setSelectedCategory(null)
      : setSelectedCategory(category);
  };

  const isCategorySelected = (category: string) =>
    category === selectedCategory;

  return {
    uniqueCategories,
    selectedCategory,
    setSelectedCategory,
    getCategoryClassName,
    handlePress,
  };
};

export default useCategorySectionController;
