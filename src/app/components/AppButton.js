import clsx from "clsx";

const AppButton = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "",
  ...props
}) => {
  const baseStyles =
    "rounded-md font-medium uppercase leading-6 tracking-wide focus:outline-none transition-all duration-300";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm shadow-sm",
    md: "px-4 py-2 text-base shadow-md",
    lg: "px-6 py-3 text-lg shadow-lg",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default AppButton;
