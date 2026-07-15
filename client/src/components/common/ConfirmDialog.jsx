import Button from "./Button";
import Modal from "./Modal";

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      size="max-w-md"
    >
      <p className="text-sm leading-6 text-neutral-600">
        {message}
      </p>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelText}
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;