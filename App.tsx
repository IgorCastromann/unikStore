import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Text>unikStore</Text>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
