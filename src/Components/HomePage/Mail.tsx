import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Event } from "microsoft-graph";
import { findIana } from "windows-iana";
import { getUserMailFolders, updateReadMail } from "../../GraphService";
import { useAppContext } from "../../AppContext";
import { AuthenticatedTemplate } from "@azure/msal-react";
import { ModalPop } from ".";
import convertHtmlToText from "html2plaintext";
import truncate from "truncate";
import moment from "moment";

export const Mail: React.FC = () => {
  const app = useAppContext();

  const [message, setMessage] = useState<Event[] | any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<any>();
  const [show, setShow] = useState(false);

  const loadMessage = async () => {
    if (app.user && !message) {
      try {
        const ianaTimeZones = findIana(app.user?.timeZone!);
        setLoading(true);
        const message = await getUserMailFolders(
          app.authProvider!,
          ianaTimeZones[0].valueOf()
        );
        setMessage(message);
        setLoading(false);
      } catch (err) {
        app.displayError!(err);
      }
    }
  };

  useEffect(() => {
    loadMessage();
  });

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  const handleShow = (item: any) => {
    setName(item);
    setShow(true);
    updateReadMail(app.authProvider!, item.id);
  };

  return (
    <AuthenticatedTemplate>
      {loading && (
        <Spinner
          animation="border"
          role="status"
          className="d-flex align-items-center mx-auto"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {message &&
        message.map((item: any) => {
          const formattedContent = truncate(
            convertHtmlToText(item.bodyPreview || ""),
            100
          );
          let date = moment(item.createdDateTime).format("DD/MM/YYYY");
          let isRead = item.isRead;

          return (
            <>
              <div
                className={`${
                  isRead
                    ? "bg-light px-5 py-1 my-3"
                    : "border-start border-5 border-primary px-5 py-1 my-3 bg-light"
                }`}
                key={item.id}
                onClick={() => handleShow(item)}
              >
                <h5 className={`${isRead ? "text-muted" : "text-dark"}`}>
                  {item.sender?.emailAddress?.name}
                </h5>
                <div
                  className={`${
                    isRead ? "text-muted d-flex" : "text-primary d-flex"
                  }`}
                >
                  <h6 className="my-1 w-50 justify-content-between">
                    {item.subject}
                  </h6>
                  <p>{date}</p>
                </div>
                <p>{formattedContent}</p>
              </div>
            </>
          );
        })}
      <ModalPop
        key={name}
        show={show}
        handleClose={handleClose}
        title={name?.subject}
        content={convertHtmlToText(name?.body.content)}
      />
    </AuthenticatedTemplate>
  );
};
