import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setError(null);
  };

  return { isOpen, error, setError, open, close };
};