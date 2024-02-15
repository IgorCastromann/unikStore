import { Input } from "native-base";
import { Platform } from "react-native";

export interface SearchInputProps {
  search: string;
  setSearch: (search: string) => void;
}
export const SearchInput = ({ setSearch, search }: SearchInputProps) => {
  const isIOS = Platform.OS == "ios";

  return (
    <Input
      placeholder="Buscar em unikStore"
      variant="underlined"
      value={search}
      onChangeText={(val) => setSearch(val)}
      width={isIOS ? "80%" : "90%"}
      testID="search-input"
    />
  );
};
