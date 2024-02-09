import AppProviders from "./AppProviders";
import { StatusBar } from "native-base";
import Stacks from "./routes";

export default function App() {
  return (
    <AppProviders>
      <Stacks />
      <StatusBar />
    </AppProviders>
  );
}
