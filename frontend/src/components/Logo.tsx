import React from "react";

interface LogoProps {
  size?: "sm" | "md";
  variant?: "default" | "glow";
  className?: string;
  glowOpacityClass?: string;
}

export default function Logo({
  size = "md",
  variant = "default",
  className = "",
  glowOpacityClass = "opacity-40 group-hover:opacity-100",
}: LogoProps) {
  const sizeClasses = {
    sm: "w-9 h-9 rounded-lg",
    md: "w-10 h-10 rounded-xl",
  };

  const borderClasses = {
    sm: "border-white/10",
    md: "border-slate-800",
  };

  const imageElement = (
    <img
      src="/icon.png"
      alt="TFT Coaching"
      className={`object-cover bg-slate-900 border ${sizeClasses[size]} ${borderClasses[size]} ${className}`}
    />
  );

  if (variant === "glow") {
    return (
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute -inset-1 bg-gradient-to-tr from-blue-600 to-teal-500 rounded-lg blur transition duration-500 ${glowOpacityClass}`}
        />
        <div className="relative flex items-center justify-center">
          {imageElement}
        </div>
      </div>
    );
  }

  return imageElement;
}
