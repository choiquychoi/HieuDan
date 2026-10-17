"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
}

const emptySubscribe = () => () => {};

export default function ModalPortal({ children }: ModalPortalProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

