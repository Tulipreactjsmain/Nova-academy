import React from "react";
import BootstrapButton from "react-bootstrap/Button";
import { SiInfoq } from "react-icons/si";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  innerBtnClassName?: string;
  outerBtnClassName?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  isInnerBorderWhite?: boolean;
  isInnerBgWhite?: boolean;
  outerBorderColor?: string;
  innerBorderColor?: string;
  textColor?: string;
  iconColor?: string;
  btnBgColor?: string;
  disabled?: boolean;
}
export default function Button({
  children,
  onClick,
  innerBtnClassName = "",
  outerBtnClassName = "",
  btnBgColor = "btn-bg-color",
  type = "button",
  icon = null,
  isInnerBorderWhite = true,
  isInnerBgWhite = false,
  outerBorderColor = "border-yellow-100 border-solid border-[3px]",
  innerBorderColor = "border-white",
  textColor,
  iconColor,
  disabled = false,
}: ButtonProps) {
  return (
    <div
      className={`navBtnBorder ${
        disabled
          ? "opacity-20 cursor-not-allowed border-blue-60 border-solid border-[3px]"
          : outerBorderColor
      } ${outerBtnClassName}`}
    >
      <BootstrapButton
        type={type}
        className={`navBtn w-full px-2 py-1 ${btnBgColor} ${
          innerBorderColor !== ""
            ? `${innerBorderColor} border-solid border-[1px]  `
            : ""
        } ${innerBtnClassName} ${
          icon ? "flex items-center justify-center gap-3" : ""
        }`}
        onClick={onClick}
        disabled={disabled}
        data-is-inner-border-white={isInnerBorderWhite}
        data-is-inner-bg-white={isInnerBgWhite}
      >
        <span className={`${disabled ? "text-blue-60" : textColor} `}>
          {children}
        </span>
        {icon && <span className={`${iconColor} me-2`}>{icon}</span>}
      </BootstrapButton>
    </div>
  );
}
