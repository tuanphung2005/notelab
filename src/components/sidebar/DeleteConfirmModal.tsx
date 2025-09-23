import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox } from "@heroui/react";
import { useState } from "react";
import type { DeleteConfirmModalProps } from "../../types/ui";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  fileName,
  onConfirmDelete
}: DeleteConfirmModalProps) {
  const [confirmChecked, setConfirmChecked] = useState(false);

  const handleConfirm = () => {
    onConfirmDelete();
    setConfirmChecked(false);
    onClose();
  };

  const handleClose = () => {
    setConfirmChecked(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} radius="none">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          confirm delete
        </ModalHeader>
        <ModalBody>
          <p>are you sure you want to delete <strong>"{fileName.replace('.md', '')}"</strong>?</p>
          <p className="text-small text-danger">this action cannot be undone.</p>
          <Checkbox 
            isSelected={confirmChecked}
            onValueChange={setConfirmChecked}
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
            onPress={handleClose}
            radius="none"
          >
            cancel
          </Button>
          <Button 
            color="danger" 
            onPress={handleConfirm}
            isDisabled={!confirmChecked}
            radius="none"
          >
            delete forever
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}