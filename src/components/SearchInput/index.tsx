import { Input } from "native-base";
import { Platform } from "react-native";

export interface SearchInputProps {
  setSearch: (search: string) => void;
}
export const SearchInput = ({ setSearch }: SearchInputProps) => {
  const isIOS = Platform.OS == "ios";

  return (
    <Input
      placeholder="Buscar em unikStore"
      autoFocus
      variant="underlined"
      onChangeText={(val) => setSearch(val)}
      width={isIOS ? "80%" : "90%"}
    />
  );
};
