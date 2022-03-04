import { Button, Modal } from "react-bootstrap";
import { OffCanvasProps } from "../../interfaces/offCanvas";

export const ModalPop: React.FC<OffCanvasProps> = ({
  show,
  title,
  content,
  handleClose,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-white"
          >
            Inbox
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{title}</h4>
          <p>{content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
