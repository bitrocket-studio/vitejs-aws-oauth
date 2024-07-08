import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ParamsGetTokenAccess,
  getAuthCode,
  getTokenAccess,
} from "../utils/helpers";

interface PropsAuthSignIn extends Omit<ParamsGetTokenAccess, "code"> {
  children: React.ReactNode;
}

export const AuthSignIn: React.FC<PropsAuthSignIn> = ({
  children,
  redirect_uri,
  client_id,
  callback,
  oAuthURL,
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
        // @ts-ignore
        window.history.replaceState({}, "", import.meta.env.BASE_URL);
      });
    }
  }, [location.pathname, code]);

  return <>{children}</>;
};
