export function getAuthCode(): string {
  const url = window.location.href;
  const codeMatch = url.match(/code=([^&]*)/);
  return codeMatch ? codeMatch[1] : "";
}

export interface ParamsGetTokenAccess {
  oAuthURL: string;
  code: string;
  client_id: string;
  redirect_uri: string;
  callback: (data: any) => void;
}

export async function getTokenAccess({
  oAuthURL,
  code,
  client_id,
  redirect_uri,
  callback,
}: ParamsGetTokenAccess): Promise<void> {
  try {
    const response = await fetch(`${oAuthURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        client_id,
        code,
        redirect_uri,
        grant_type: "authorization_code",
      }),
    });
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
}

export interface ParamsOnLogin {
  oAuthURL: string;
  idp: string;
  clientID: string;
  redirectURI: string;
}

export function getLinkSSO({
  oAuthURL,
  idp,
  clientID,
  redirectURI,
}: ParamsOnLogin): string {
  return `${oAuthURL}/authorize?idp_identifier=${idp}&response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}`;
}
