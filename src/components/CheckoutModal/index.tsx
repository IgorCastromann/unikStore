import { Modal } from "native-base";
import { CheckoutForm } from "../CheckoutForm";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="bg-black"
      testID="checkout-modal"
    >
      <Modal.Content className="bg-black">
        <CheckoutForm />
      </Modal.Content>
    </Modal>
  );
};
