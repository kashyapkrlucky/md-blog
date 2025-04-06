import clsx from "clsx";

const AppInput = ({
  label = "",
  type = "text",
  placeholder = "Enter text",
  size = "md",
  variant = "default",
  disabled = false,
  error = "",
  className = "",
  ...props
}) => {
  const baseStyles =
    "rounded-lg border focus:outline-none transition-all duration-300";

  const variantStyles = {
    default: "border-gray-300 focus:ring-2 focus:ring-blue-500",
    filled: "bg-gray-100 border-transparent focus:ring-2 focus:ring-blue-500",
    outline: "border border-blue-600 focus:ring-2 focus:ring-blue-500",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const errorStyles = error ? "border-red-500 focus:ring-red-500" : "";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-700 font-medium mb-2 text-xs uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          "w-full",
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          errorStyles,
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AppInput;
