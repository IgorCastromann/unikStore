import { Item } from "@src/@types/item";
import services from "@src/service/items";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const queryItems = () => {
  const query = useQuery({
    queryKey: ["items"],
    queryFn: services.getItems,
  });

  return query;
};

const deleteItem = () => {
  const mutation = useMutation({
    mutationFn: (item: Item) => {
      return services.removeItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });

  return mutation;
};

const checkoutItems = () => {
  const mutation = useMutation({
    mutationFn: (items: Item[]) => {
      return services.checkoutItems(items);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });

  return mutation;
};

const queries = {
  queryItems,
  deleteItem,
  checkoutItems,
};

export default queries;
