import ScreenLayout from "@src/layouts/ScreenLayout";
import { ItemList } from "./ItemList";
import { useHomeController } from "./controller";
import { ItemDetailsModal } from "@src/components/ItemDetailsModal";
import { Spin } from "@src/components/Spin";
import { Error } from "@src/components/Error";

const Home = () => {
  const { queryItems, selectedItem } = useHomeController();
  const { data: items, error, isLoading } = queryItems();

  if (isLoading) return <Spin />;

  if (error) return <Error message={error.message} />;

  return (
    <ScreenLayout>
      <ItemDetailsModal item={selectedItem!} />
      <ItemList items={items ?? []} />
    </ScreenLayout>
  );
};

export default Home;
