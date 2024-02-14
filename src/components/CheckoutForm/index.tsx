import { Button, Divider, VStack } from "native-base";
import useCheckoutFormController from "./controller";
import { NavigationRoutes } from "@src/routes/types";
import { CardSectionForm } from "./CardSection";
import { AdressSection } from "./AdressSection";

interface CheckoutFormProps {
  navigation: NavigationRoutes | undefined;
}
export const CheckoutForm = ({ navigation }: CheckoutFormProps) => {
  const {
    handleCheckout,
    isValid,
    publicKey,
    setIsValid,
    totalCartValue,
    isLoading,
  } = useCheckoutFormController();

  return (
    <VStack className="h-full">
      <AdressSection />
      <Divider className="my-4" />
      <CardSectionForm publicKey={publicKey} setIsValid={setIsValid} />

      <Button
        className="bg-blue-500 h-[50] text-white rounded-sm mt-4"
        disabled={!isValid}
        onPress={() => handleCheckout(navigation)}
        testID="submit-payment-button"
        isLoading={isLoading}
      >
        {isValid ? `Pagar R$ ${totalCartValue}` : "Invalid card"}
      </Button>
    </VStack>
  );
};
