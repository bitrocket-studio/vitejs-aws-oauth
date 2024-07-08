# vitejs-aws-oauth

_vitejs-aws-oauth_ è una libreria React progettata per gestire l'autenticazione tramite OAuth2.0 con **Amazon Cognito** su server statici di AWS S3. Questa libreria è particolarmente utile per le applicazioni che sono servite da una subfolder all'interno di un bucket S3, dove ogni subfolder rappresenta una singola applicazione.

## Premesse

Quando si distribuiscono applicazioni React sviluppate con **ViteJS** su un server statico AWS S3, possono sorgere problemi legati alla gestione delle subfolder. Amazon S3, infatti, non distingue tra subfolder del progetto e sottopagine della cartella subfolder, causando errori quando tenta di caricare le risorse della SPA (Single Page Application) dalle subfolder.

Per risolvere questi problemi, **la libreria prevede l'utilizzo del componenten HashRouter** di `react-router-dom`, che permette di gestire correttamente le route interne dell'applicazione senza interferire con la struttura delle subfolder. Tuttavia, su Amazon Cognito, non è possibile utilizzare URL di redirect contenenti il carattere `#` (hash). Pertanto, il processo di login viene gestito dalla pagina principale del progetto.

## Installazione

Per installare la libreria, esegui il seguente comando:

```bash
npm install vitejs-aws-oauth
```

## Utilizzo

### 1. AuthProvider

`AuthProvider` è un componente che deve avvolgere la tua applicazione per gestire correttamente la modifica della posizione URL.

#### Esempio:

```typescript
// main.tsx

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
```

### 2. AuthSignIn

`AuthSignIn` è un componente che gestisce il flusso di sign-in utilizzando OAuth2.0. Estrae il codice di autorizzazione dall'URL e richiede un token di accesso.

#### Props:

- `redirect_uri`: L'URI di reindirizzamento configurato nel provider OAuth.
- `client_id`: L'ID client fornito dal provider OAuth.
- `callback`: Una funzione di callback che verrà chiamata con i dati dell'autenticazione.

#### Esempio:

```typescript
import React from "react";
import { AuthSignIn } from "my-auth-library";

const handleAuthCallback = (data: any) => {
  console.log("Authenticated:", data);
};

const App = () => (
  <AuthSignIn
    redirect_uri="https://yourapp.com/callback"
    client_id="your-client-id"
    callback={handleAuthCallback}
    baseURL="/{subFolderApp}/"
  >
    <YourComponent />
  </AuthSignIn>
);

export default App;
```

### 3. getLinkSSO

`getLinkSSO` è una funzione di utilità che genera l'URL di autenticazione SSO per il provider OAuth.

#### Params:

- `oAuthURL`: L'URL di base del provider OAuth.
- `idp`: L'identificatore del provider di identità.
- `clientID`: L'ID client fornito dal provider OAuth.
- `redirectURI`: L'URI di reindirizzamento configurato nel provider OAuth.

#### Esempio:

```typescript
import { getLinkSSO } from "my-auth-library";

const ssoLink = getLinkSSO({
  oAuthURL: "https://your-oauth-url.com",
  idp: "your-idp",
  clientID: "your-client-id",
  redirectURI: "https://yourapp.com/callback",
});

console.log("SSO Link:", ssoLink);
```

## API

### `AuthProvider`

```typescript
interface PropsProviderAuth {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<PropsProviderAuth>;
```

### `AuthSignIn`

```typescript
interface PropsAuthSignIn {
  children: React.ReactNode;
  redirect_uri: string;
  client_id: string;
  callback: (auth: any) => void;
}

export const AuthSignIn: React.FC<PropsAuthSignIn>;
```

### `getLinkSSO`

```typescript
interface ParamsOnLogin {
  oAuthURL: string;
  idp: string;
  clientID: string;
  redirectURI: string;
}

export function getLinkSSO(params: ParamsOnLogin): string;
```

## Contributi

Se hai suggerimenti, bug da segnalare o miglioramenti da proporre, apri un'issue o una pull request nel repository GitHub. Ogni contributo è benvenuto!

## Licenza

Questa libreria è rilasciata sotto la licenza MIT. Consulta il file [LICENSE](LICENSE) per maggiori dettagli.

```

### Note Finali:
1. **Aggiungi il file `LICENSE`**: Assicurati di includere un file `LICENSE` nel repository per specificare i termini della licenza.
2. **Personalizzazione**: Personalizza le informazioni come URL del provider OAuth, URI di reindirizzamento e ID client in base alle tue necessità specifiche.
3. **Test**: Assicurati di testare a fondo la libreria nei tuoi progetti per garantire che funzioni come previsto.

Con questo `README.md`, gli utenti della libreria avranno una chiara comprensione di come integrare e utilizzare la libreria nei loro progetti React.
```

```

```
