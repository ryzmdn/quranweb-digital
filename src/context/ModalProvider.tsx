import { useState, useMemo, type ReactNode } from "react";
import { ModalContext, type ModalContextType } from "@/context/ModalContext";

export function ModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const value = useMemo<ModalContextType>(
    () => ({ isOpen, openModal, closeModal }),
    [isOpen]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
