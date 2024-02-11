import { Box, FlatList, Pressable } from "native-base";
import useCategorySectionController from "./controller";

export const CategorySection = () => {
  const {
    uniqueCategories,
    selectedCategory,
    setSelectedCategory,
    handlePress,
  } = useCategorySectionController();

  return (
    <FlatList
      horizontal
      data={uniqueCategories}
      renderItem={({ item }) => (
        <CategoryTag
          category={item}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handlePress={handlePress}
        />
      )}
      className="mx-5 my-2"
      testID="category-section"
    />
  );
};

interface CategoryTagProps {
  category: string;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  handlePress: (category: string) => void;
}
export const CategoryTag = ({ category, handlePress }: CategoryTagProps) => {
  const { getCategoryClassName } = useCategorySectionController();

  return (
    <Pressable
      onPress={() => handlePress(category)}
      className="h-10"
      testID="category-section__tag"
    >
      <Box className={getCategoryClassName(category)}>{category}</Box>
    </Pressable>
  );
};
