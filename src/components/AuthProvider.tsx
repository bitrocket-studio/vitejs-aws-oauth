import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PropsProviderAuth {
  children: React.ReactNode;
  baseURL: string;
}

export const AuthProvider: React.FC<PropsProviderAuth> = ({
  children,
  baseURL,
}) => {
  const location = useLocation();
  const isRoot = window.location.hash === "#/";

  useEffect(() => {
    if (isRoot) {
      window.location.hash = "";
      window.history.replaceState({}, "", baseURL);
    }
  }, [location.pathname, isRoot]);

  return <>{children}</>;
};
