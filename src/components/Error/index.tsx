import { HStack, Text } from "native-base";

interface ErrorProps {
  message: string;
}
export const Error = ({ message }: ErrorProps) => {
  return (
    <HStack className="flex-1 justify-center" testID="error">
      <Text>Error: {message}</Text>
    </HStack>
  );
};
