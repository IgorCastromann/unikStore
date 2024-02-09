import services from "@src/service/items";
import { useQuery } from "@tanstack/react-query";

const queryItems = () => {
  const query = useQuery({
    queryKey: ["items"],
    queryFn: services.getItems,
  });

  return query;
};

const queries = {
  queryItems,
};

export default queries;
