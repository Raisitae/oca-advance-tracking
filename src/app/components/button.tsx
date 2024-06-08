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
      className={classname}>
      {text}
    </button>
  );
};

export default Button;
