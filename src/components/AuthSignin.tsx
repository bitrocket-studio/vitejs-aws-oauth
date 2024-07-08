import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ParamsGetTokenAccess,
  getAuthCode,
  getTokenAccess,
} from "../utils/helpers";

interface PropsAuthSignIn extends ParamsGetTokenAccess {
  children: React.ReactNode;
  baseURL: string;
}

export const AuthSignIn: React.FC<PropsAuthSignIn> = ({
  children,
  redirect_uri,
  client_id,
  callback,
  oAuthURL,
  baseURL,
}) => {
  const location = useLocation();
  const code = getAuthCode();

  useEffect(() => {
    if (code) {
      getTokenAccess({
        code,
        redirect_uri,
        client_id,
        callback,
        oAuthURL,
      }).then(() => {
        window.history.replaceState({}, "", baseURL);
      });
    }
  }, [location.pathname, code]);

  return <>{children}</>;
};
