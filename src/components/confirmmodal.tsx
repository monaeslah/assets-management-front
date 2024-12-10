import React from "react";
import ReactDOM from "react-dom";
import AssetForm from "./assetform";

interface ModalFormProps {
  isOpen: boolean;
  initialData?: {
    name: string;
    type: string;
    serialNumber: string;
    status: string;
  };
  onSave: (data: {
    name: string;
    type: string;
    serialNumber: string;
    status: string;
  }) => void;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  initialData,
  onSave,
  onClose,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>
          ×
        </button>
        <AssetForm
          initialData={initialData}
          onSave={onSave}
          onCancel={onClose}
        />
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    borderRadius: "8px",
    padding: "20px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "relative" as const,
  },
  closeButton: {
    position: "absolute" as const,
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
};

export default ModalForm;
