import { type PropsWithChildren } from "react";
import { VStack } from "native-base";

const ScreenLayout = ({ children }: PropsWithChildren) => (
  <VStack safeAreaX safeAreaBottom height="100%">
    {children}
  </VStack>
);

export default ScreenLayout;
