import React, { ReactNode } from "react";

interface InputWrapperProps {
  label?: string;
  children: ReactNode;
  error?: string;
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  label,
  children,
  error,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && (
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          {label}
        </label>
      )}
      <div>{children}</div>
      {error && (
        <span style={{ color: "red", fontSize: "0.875rem" }}>{error}</span>
      )}
    </div>
  );
};

export default InputWrapper;
