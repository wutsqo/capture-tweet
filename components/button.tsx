import { FC } from "react";

interface ButtonProps {
  disabled?: boolean;
  children: string;
  type?: "submit" | "button";
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  type,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 w-36 h-12 rounded-md text-white font-semibold 
                       disabled:grayscale enabled:hover:from-pink-500 enabled:hover:via-purple-500 enabled:hover:to-indigo-600"
      disabled={disabled}
    >
      {children}
    </button>
  );
};
