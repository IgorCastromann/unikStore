import ScreenLayout from "@src/layouts/ScreenLayout";
import { ItemList } from "./ItemList";
import { useHomeController } from "./controller";
import { ItemDetailsModal } from "@src/components/ItemDetailsModal";
import { Spin } from "@src/components/Spin";
import { Error } from "@src/components/Error";
import { RootStackScreenComponent } from "@src/routes/types";
import { CategorySection } from "./CategorySection";

// eslint-disable-next-line no-empty-pattern
const Home = ({}: RootStackScreenComponent<"Home">) => {
  const { queryItems, selectedItem, handleGetFilteredItems } =
    useHomeController();
  const { error, isLoading } = queryItems();
  const filteredItems = handleGetFilteredItems();

  if (isLoading) return <Spin />;

  if (error) return <Error message={error.message} />;

  return (
    <ScreenLayout>
      <CategorySection />
      <ItemList items={filteredItems ?? []} />
      <ItemDetailsModal item={selectedItem!} />
    </ScreenLayout>
  );
};

export default Home;
