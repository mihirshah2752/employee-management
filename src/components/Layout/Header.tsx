import React from "react";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h2 className="flex subpixel-antialiased justify-center text-pretty tracking-tight text-gray-900 sm:text-5xl">
        {title}
      </h2>
    </header>
  );
};
