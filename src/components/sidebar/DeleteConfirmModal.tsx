import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox } from "@heroui/react";
import { useState } from "react";
import type { DeleteConfirmModalProps } from "../../types";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  fileName,
  onConfirm
}: DeleteConfirmModalProps) {
  const [checked, setChecked] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setChecked(false);
    onClose();
  };

  const close = () => {
    setChecked(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} radius="none">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          confirm delete
        </ModalHeader>
        <ModalBody>
          <p>are you sure you want to delete <strong>"{fileName.replace('.md', '')}"</strong>?</p>
          <p className="text-small text-danger">this action cannot be undone.</p>
          <Checkbox 
            isSelected={checked}
            onValueChange={setChecked}
            className="mt-2"
            radius="none"
            color="danger"
          >
            yes, i'm sure
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button 
            variant="light" 
            onPress={close}
            radius="none"
          >
            cancel
          </Button>
          <Button 
            color="danger" 
            onPress={handleConfirm}
            isDisabled={!checked}
            radius="none"
          >
            delete forever
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}