import { type PropsWithChildren } from "react";
import { VStack } from "native-base";

const ScreenLayout = ({ children }: PropsWithChildren) => (
  <VStack safeAreaX safeAreaBottom>
    {children}
  </VStack>
);

export default ScreenLayout;
