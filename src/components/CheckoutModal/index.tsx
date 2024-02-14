import { Modal } from "native-base";
import { CheckoutForm } from "../CheckoutForm";
import { NavigationRoutes } from "@src/routes/types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationRoutes | undefined;
}
export const CheckoutModal = ({
  isOpen,
  onClose,
  navigation,
}: CheckoutModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="bg-black"
      testID="checkout-modal"
    >
      <Modal.Content className="bg-black">
        <CheckoutForm navigation={navigation} />
      </Modal.Content>
    </Modal>
  );
};
