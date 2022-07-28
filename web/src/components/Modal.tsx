import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export const Dialog = ({
  open,
  close,
  children,
}: {
  open: boolean;
  close: () => void;
  children: ReactNode;
}) => {
  return (
    <Modal isOpen={open} onClose={close} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Jeux terminé</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
