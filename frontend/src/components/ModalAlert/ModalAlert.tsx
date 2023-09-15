import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { red, green } from "@mui/material/colors";

interface MuiAlertProps {
  open: boolean;
  title: string;
  text: string;
  icon?: "success" | "error";
  confirmButtonText: string;
  onClose: () => void;
}

const MuiAlert: React.FC<MuiAlertProps> = ({
  open,
  title,
  text,
  icon,
  confirmButtonText,
  onClose,
}) => {
  const titleStyle =
    icon === "error" ? { color: red[500] } : { color: green[500] };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={titleStyle}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MuiAlert;
