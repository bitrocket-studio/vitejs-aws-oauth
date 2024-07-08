import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PropsProviderAuth {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<PropsProviderAuth> = ({ children }) => {
  const location = useLocation();
  const isRoot = window.location.hash === "#/";

  useEffect(() => {
    if (isRoot) {
      window.location.hash = "";
      // @ts-ignore
      window.history.replaceState({}, "", import.meta.env.BASE_URL);
    }
  }, [location.pathname, isRoot]);

  return <>{children}</>;
};
