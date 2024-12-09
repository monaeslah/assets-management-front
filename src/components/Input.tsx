import React from "react";
import { InputFieldProps } from "../types/components";

const InputField: React.FC<InputFieldProps> = ({
  className = "",
  label,
  children,
  iconBefore,
}) => {
  return (
    <div className="inputContainer">
      {label && <p className="form-field">{label}</p>}
      <div className={`input-wrapper ${className}`}>
        {iconBefore && <img src={iconBefore} alt="Input icon" />}
        {children || <span>No content provided</span>}
      </div>
    </div>
  );
};

export default InputField;
