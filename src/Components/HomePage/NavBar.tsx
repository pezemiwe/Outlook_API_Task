import { useState, useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { findIana } from "windows-iana";
import {
  Badge,
  Container,
  Dropdown,
  Navbar,
  Nav,
  NavDropdown,
  NavItem,
} from "react-bootstrap";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { getUserMailFolders } from "../../GraphService";
import { AppUser, useAppContext } from "../../AppContext";

interface UserAvatarProps {
  user: AppUser;
}

function UserAvatar(props: UserAvatarProps) {
  // If a user avatar is available, return an img tag with the pic
  return (
    <img
      src={props.user.avatar || "/images/no-profile-photo.png"}
      alt="user"
      className="rounded-circle align-self-center mr-2"
      style={{ width: "32px" }}
    ></img>
  );
}

export const NavBar: React.FC = () => {
  const app = useAppContext();
  const user = app.user || { displayName: "", email: "" };
  const [mail, setMail] = useState<Event[] | any>();
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const loadMail = async () => {
      if (app.user && !mail) {
        try {
          const ianaTimeZones = findIana(app.user?.timeZone!);
          const mail = await getUserMailFolders(app.authProvider!, ianaTimeZones[0].valueOf());
          setMail(mail);
          setNumber(mail.map((item: any) => item.isRead ? 0 : 1).reduce((a: number, b: number) => a + b, 0));
        } catch (err) {
          app.displayError!(err);
        }
      }
    };

    loadMail();
  },);



  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <Container>
        <Navbar.Brand href="/">WYSE</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto" navbar>
            <NavItem>
              <RouterNavLink to="/" className="nav-link" exact>
                Home
              </RouterNavLink>
            </NavItem>
          </Nav>
          <Nav className="ms-auto align-items-center" navbar>
            <AuthenticatedTemplate>
              <NavItem>
                <RouterNavLink to="/inbox" className="nav-link" exact>
                  Inbox <Badge bg="secondary">{number}</Badge>
                </RouterNavLink>
              </NavItem>
              <NavDropdown
                title={<UserAvatar user={user} />}
                id="user-dropdown"
                align="end"
              >
                <h5 className="dropdown-item-text mb-0">{user.displayName}</h5>
                <p className="dropdown-item-text text-muted mb-0">
                  {user.email}
                </p>
                <Dropdown.Divider />
                <Dropdown.Item onClick={app.signOut!}>Sign Out</Dropdown.Item>
              </NavDropdown>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <NavItem>
                <Nav.Link onClick={app.signIn!}>Sign In</Nav.Link>
              </NavItem>
            </UnauthenticatedTemplate>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
