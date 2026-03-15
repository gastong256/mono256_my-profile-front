"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type HeaderUiContextValue = {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const HeaderUiContext = createContext<HeaderUiContextValue | null>(null);

export function HeaderUiProvider({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const value = useMemo(
    () => ({
      isMobileMenuOpen,
      setMobileMenuOpen,
    }),
    [isMobileMenuOpen]
  );

  return (
    <HeaderUiContext.Provider value={value}>
      {children}
    </HeaderUiContext.Provider>
  );
}

export function useHeaderUi() {
  const value = useContext(HeaderUiContext);

  if (!value) {
    throw new Error("useHeaderUi must be used within HeaderUiProvider");
  }

  return value;
}
