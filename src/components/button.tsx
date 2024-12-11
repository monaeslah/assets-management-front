import React, { useState, MouseEvent } from "react";
import classNames from "classnames";
import { AssetButtonProps } from "../types/components";

const AssetButton: React.FC<AssetButtonProps> = ({
  size,
  className,
  enable,
  onClick,
  label,
  options,
}) => {
  const [showOption, setShowOption] = useState<boolean>(false);

  const buttonClasses = classNames(
    "mainBtn",
    {
      smallButton: size === "small",
      mediumButton: size === "medium",
      largeButton: size === "large",
      xlargeButton: size === "xlarge",
      removeButton: size === "remove",
    },
    className,
    { pointer: enable, not_allowed: !enable }
  );

  const handleOptionClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setShowOption(!showOption);
  };

  return (
    <div className={buttonClasses} onClick={enable ? onClick : undefined}>
      {options ? (
        <>
          <span onClick={handleOptionClick} className="innerButton">
            {label}
          </span>
          {showOption && (
            <div className="options">
              {options.map((item, index) => (
                <div
                  key={index}
                  className="optionitem"
                  onClick={() => {
                    setShowOption(false);
                    console.log(`${item} selected`);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <span className="innerButton caption">{label}</span>
      )}
    </div>
  );
};

export default AssetButton;
