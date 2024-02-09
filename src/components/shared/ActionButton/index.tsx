import { Button } from "native-base";
import { IButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";
import React from "react";

export const ActionButton = ({ children, ...props }: IButtonProps) => {
  return (
    <Button colorScheme="gray" px={8} ml={5} rounded="xl" {...props}>
      {children}
    </Button>
  );
};
