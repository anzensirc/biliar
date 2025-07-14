import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <React.Fragment>{children}</React.Fragment>;
}
