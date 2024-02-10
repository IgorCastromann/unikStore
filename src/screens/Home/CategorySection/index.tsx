import { Box, FlatList, Pressable } from "native-base";
import useCategorySectionController from "./controller";

export const CategorySection = () => {
  const { uniqueCategories, selectedCategory, setSelectedCategory } =
    useCategorySectionController();

  return (
    <FlatList
      horizontal
      data={uniqueCategories}
      renderItem={({ item }) => (
        <CategoryTag
          category={item}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      className="m-2 bg-blue-200]"
    />
  );
};

interface CategoryTagProps {
  category: string;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}
const CategoryTag = ({ category }: CategoryTagProps) => {
  const { getCategoryClassName, handlePress } = useCategorySectionController();

  return (
    <Pressable onPress={() => handlePress(category)} className="h-10">
      <Box className={getCategoryClassName(category)}>{category}</Box>
    </Pressable>
  );
};
