import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";

import ProvideAppContext from "./AppContext";
import { ErrorMessage, Mail, NavBar, Welcome } from "./Components/HomePage";

type AppProps = {
  pca: IPublicClientApplication;
};

export default function App({ pca }: AppProps) {
  return (
    <MsalProvider instance={pca}>
      <ProvideAppContext>
        <Router>
          <div>
            <NavBar />
            <Container>
              <ErrorMessage />
              <Route
                exact
                path="/"
                render={(props) => <Welcome {...props} />}
              />
              <Route
                exact
                path="/inbox"
                render={() => <Mail />}
              />
            </Container>
          </div>
        </Router>
      </ProvideAppContext>
    </MsalProvider>
  );
}
