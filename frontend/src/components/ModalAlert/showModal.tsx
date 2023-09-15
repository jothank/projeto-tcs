import ReactDOM from "react-dom";
import React from "react";
import MuiAlert from "./ModalAlert";

type AlertOptions = {
  title: string;
  text: string;
  icon?: "success" | "error";
  confirmButtonText: string;
};

export const showAlert = (options: AlertOptions) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  };

  ReactDOM.render(
    <MuiAlert
      open={true}
      title={options.title}
      text={options.text}
      icon={options.icon}
      confirmButtonText={options.confirmButtonText}
      onClose={handleClose}
    />,
    container
  );
};
