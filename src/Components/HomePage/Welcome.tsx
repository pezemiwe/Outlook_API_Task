import { Button, Container } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useAppContext } from "../../AppContext";

export const Welcome: React.FC<RouteComponentProps> = () => {
  const app = useAppContext();

  return (
    <div className="p-5 mt-5 mb-4 bg-light rounded-3">
      <Container fluid>
        <AuthenticatedTemplate>
          <div>
            <h1>Welcome {app.user?.displayName || ""}!</h1>
            <p>Use the navigation bar at the top of the page to get started.</p>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <h1>WYSE</h1>
          <p className="lead">
            Wyse is a simple, secure, and easy to use application for email
            updates monitoring.
          </p>
          <p className="lead">Sign in to get started.</p>
          <Button color="primary" onClick={app.signIn!}>
            Click here to sign in
          </Button>
        </UnauthenticatedTemplate>
      </Container>
    </div>
  );
};
