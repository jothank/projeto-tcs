
import CloseIcon from '@mui/icons-material/Close';
import { DialogProps, DialogActions, Button, Dialog, DialogTitle, IconButton, DialogContent, DialogContentText } from '@mui/material';
import React from 'react';
import DefaultDialogTransition from '../DefaultDialogTransition';
import './styles.css';

export interface CustomDialogProps extends DialogProps {
  handleClose: () => void;
  handleConfirm?: () => void;
  customTitle?: string | React.ReactNode;
  customActions?: React.ReactNode;
  showCloseButton?: boolean;
  subTitle?: string;
  okButtonLabel?: string;
  showOneButton?: boolean;
  hideDefaultButtons?: boolean;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  disableOkButton?: boolean;
  contentDividers?: boolean;
  noPadding?: boolean;
}

const CustomDialogActions = (props: CustomDialogProps) => {
  const {
    showOneButton,
    disableOkButton,
    okButtonLabel,
    handleClose,
    handleConfirm,
  } = props;
  if (showOneButton) {
    return (
      <DialogActions className='dialogButtonAlone'>
        <Button
          disabled={disableOkButton}
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          style={{ position: 'relative' }}
        >
          {okButtonLabel ?? 'Fechar'}
        </Button>
      </DialogActions>
    );
  }

  return (
    <DialogActions className='dialogButtonContainer'>
      <Button onClick={handleClose} variant="outlined" color="primary">
        Cancelar
      </Button>
      <Button
        disabled={disableOkButton}
        onClick={handleConfirm}
        variant="contained"
        color="primary"
      >
        {okButtonLabel ?? 'Concluir'}
      </Button>
    </DialogActions>
  );
};

export const CustomDialog: React.FC<CustomDialogProps> = (
  props: CustomDialogProps,
) => {
  const {
    open,
    handleClose,
    maxWidth,
    title,
    customTitle,
    contentDividers,
    subTitle,
    children,
    hideDefaultButtons,
    showCloseButton,
    customActions,
    noPadding,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={DefaultDialogTransition}
      keepMounted
      fullWidth
      maxWidth={maxWidth ?? 'lg'}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      classes={{
        paper: 'paperClassDialogContent',
        root:'rootClassDialogContent',
      }}
    >
      {title || customTitle ? (
        <DialogTitle>{title ?? customTitle}</DialogTitle>
      ) : null}
      {showCloseButton && (
        <IconButton className='closeButton' onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      )}
      <DialogContent
        className={noPadding ? 'noPaddingContent' : ''}
        dividers={contentDividers}
      >
        {subTitle ? (
          <DialogContentText id="alert-dialog-slide-description">
            {subTitle}
          </DialogContentText>
        ) : null}
        {children}
      </DialogContent>
      {hideDefaultButtons ? (
        customActions && customActions
      ) : (
        <CustomDialogActions {...props} />
      )}
    </Dialog>
  );
};
