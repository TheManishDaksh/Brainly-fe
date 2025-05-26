import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" 
  size?: "sm" | "md" | "lg";
};

export default function Button ({
  className = "",
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variantStyles =
    variant === "default"
      ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
      : variant === "outline"
      ? "border border-indigo-300 text-indigo-700 bg-indigo-100 hover:bg-slate-100"
      :""
      
  const sizeStyles =
    size === "sm"
      ? "px-3 py-1.5 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-base";

  const combinedClasses = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`;

  return <button className={combinedClasses} {...props} />;
};
