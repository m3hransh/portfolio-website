import React, { FC } from "react";

interface ContainerProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children, ...customMeta }) => {
  return (
    <div className="bg-background-50 text-main-700 dark:text-main-100 dark:bg-background-800 h-full">
      <div className="flex flex-col justify-center px-8">{children}</div>
    </div>
  );
};

export default Container;
