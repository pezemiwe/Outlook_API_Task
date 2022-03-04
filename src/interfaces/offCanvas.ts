export interface OffCanvasProps {
  show: boolean;
  title: string | any;
  content: string | any;
  handleClose: () => void;
}

export interface emailObject {
  body?: {
    content?: string;
  };
  bodyPreview?: string;
  isRead?: boolean;
  createdDateTime?: string;
  subject?: string;
  sender?: {
    emailAddress?: {
      name?: string;
    };
  };
}
