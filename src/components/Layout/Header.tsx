import React from "react";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h2 className="flex justify-center text-pretty tracking-wide text-gray-900 font-semibold text-2xl sm:text-3xl subpixel-antialiased">
        {title}
      </h2>
    </header>
  );
};
