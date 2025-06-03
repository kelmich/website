"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeToggle />
      {children}
    </div>
  );
}
