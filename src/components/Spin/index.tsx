import { HStack, Spinner } from "native-base";

export const Spin = () => {
  return (
    <HStack className="flex-1 justify-center">
      <Spinner />
    </HStack>
  );
};
