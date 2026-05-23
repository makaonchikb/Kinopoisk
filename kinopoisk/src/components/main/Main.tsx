import React, { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps): React.ReactElement {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
      {children}
    </main>
  );
}