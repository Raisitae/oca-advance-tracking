import React from "react";

type ButtonProps = {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  classname?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type,
  disabled = false,
  classname,
}) => {
  return (
    <button
      type={type}
      onClick={() => onClick}
      disabled={disabled}
      className={
        classname +
        " " +
        `justify-center px-4 py-2.5 text-sm font-medium tracking-wide leading-5 text-white whitespace-nowrap bg-sky-600 rounded ${
          disabled ? "bg-slate-300 " : ""
        } hover:bg-blue-800 active:bg-blue-900 focus:bg-blue-800`
      }>
      {text}
    </button>
  );
};

export default Button;
