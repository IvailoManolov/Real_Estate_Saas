import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from "@mantine/core";

// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8utzs7178ywemc3w.us.auth0.com"
      clientId="VnsSsvoJxkecQymTWyOXQPeQhgYbbT06"
      authorizationParams={{
        redirect_uri: 'http://localhost:5173'
      }}
      audience="http://localhost:8080"
      scope="openid profile email"
    >
      <MantineProvider>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
