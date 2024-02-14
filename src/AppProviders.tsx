import { QueryClientProvider } from "@tanstack/react-query";
import { extendTheme, NativeBaseProvider } from "native-base";
import { type FC, type PropsWithChildren } from "react";
import { queryClient } from "./queries";

const inset = {
  frame: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  insets: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

const customTheme = extendTheme({ config });

const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider initialWindowMetrics={inset} theme={customTheme}>
        {children}
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
