import React from "react";
import ReactDOM from "react-dom";
interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}) => {
  if (!isOpen) return null;
  console.log("Is Delete Modal Open:", isOpen, confirm);
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p>{message}</p>
        <div>
          <button
            onClick={() => {
              onConfirm();
            }}
            style={styles.confirmButton}
          >
            Confirm
          </button>
          <button onClick={onCancel} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
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
    width: "300px",
    minHeight: "90px",
    textAlign: "center" as const,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",

    flexDirection: "column",
    gap: "45px",
  },
  confirmButton: {
    background: "#00072d",
    color: "white",
    border: "none",
    padding: "10px 20px",
    marginRight: "10px",
    cursor: "pointer",
    maxWidth: "90px",
    textAlight: "center",
  },
  cancelButton: {
    background: "#0e6ba8",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    maxWidth: "90px",
    textAlight: "center",
  },
};

export default ConfirmModal;
