import { type PropsWithChildren } from "react";
import { VStack } from "native-base";

interface ScreenLayoutProps extends PropsWithChildren {
  height?: string;
}

const ScreenLayout = ({ height, children }: ScreenLayoutProps) => (
  <VStack safeAreaX safeAreaBottom height={height}>
    {children}
  </VStack>
);

export default ScreenLayout;
