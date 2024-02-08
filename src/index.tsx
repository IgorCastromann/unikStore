import AppProviders from "./AppProviders";
import { StatusBar, Text } from "native-base";

export default function App() {
  return (
    <AppProviders>
      <Text className="text-red-500 ">unikStore</Text>
      <StatusBar />
    </AppProviders>
  );
}
