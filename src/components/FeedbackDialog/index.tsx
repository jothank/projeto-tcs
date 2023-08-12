
import { useTheme } from '@emotion/react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InfoIcon from '@mui/icons-material/Info';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Dialog, DialogContent, Grid, Typography, Button, Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { FeedbackContent } from '../../context/Feedback';
import DefaultDialogTransition from '../DefaultDialogTransition';
import './styles.css';


interface FeedbackDialogProps {
  message: FeedbackContent;
}

interface FeedbackTypeContent {
  backgroudColor: string;
  icon: any;
}

export type FeedbackType = 'success' | 'error' | 'info' | 'warning';

export const FeedbackDialog: React.FC<FeedbackDialogProps> = (
  props: FeedbackDialogProps,
) => {
  const { message } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const FEEDBACK_BY_TYPE: { [key: string]: FeedbackTypeContent } = {
    error: {
      backgroudColor: '#CF101F',
      icon: <HighlightOffIcon style={{fontSize: '60px'}}/>,
    },
    info: { backgroudColor: '#4D86F4', icon: <InfoIcon style={{fontSize: '60px'}}/> },
    warning: {
      backgroudColor: '#FF8A00',
      icon: <ReportProblemIcon style={{fontSize: '60px'}}/>,
    },
    success: {
      backgroudColor: '#42B883',
      icon: <CheckCircleOutlineIcon style={{fontSize: '60px'}}/>,
    },
  };

  const getFeedbackStyle = (type: FeedbackType): FeedbackTypeContent => {
    return FEEDBACK_BY_TYPE[type];
  };

  const handleDialogClose = useCallback(() => {
    if (message.okButtonAction) {
      message.okButtonAction();
    }
    setOpen(false);
  }, [message]);

  const additionalAction = () => {
    if (message.additionalAction) {
      message.additionalAction();
    }
    setOpen(false);
  };

  useEffect(() => {
    if (message.description || message.customDescription) {
      setOpen(true);
      const defaultTimeout = message.timeout ?? 7000;
      if (message.timeout && message.timeout > 0) {
        const timer = setTimeout(() => {
          handleDialogClose();
        }, defaultTimeout);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [handleDialogClose, message]);

  return (
    <Dialog
      open={open}
      TransitionComponent={DefaultDialogTransition}
      maxWidth="md"
    >
      <DialogContent
        style={{
          background: `${getFeedbackStyle(message.type!)?.backgroudColor}`,
          zIndex: '1301',
          minHeight: '285px',
          borderRadius: '12px',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem 9rem'
        }}
      >
        <Grid
          container
          className='dialogContentContainer'
          direction="column"
          alignItems="center"
          alignContent="center"
        >
          {getFeedbackStyle(message.type!)?.icon}
          {message.customDescription ? (
            message.customDescription
          ) : (
            <>
              <Typography variant="h6">{message.title}</Typography>
              <Box
                style={{
                  backgroundColor: message.showDescriptionBackgroundContrast
                    ? 'blue'
                    : 'transparent',
                  padding: '1rem',
                }}
              >
                <Typography align="center">{message.description}</Typography>

                <Typography style={{ fontSize: '14px' }}>
                  {message.subDescription}
                </Typography>
              </Box>
            </>
          )}
          <Button
            onClick={handleDialogClose}
            className='feedbackDialogButton'
            style={{
              marginTop: '24px',
              color: '#525252',
              background: '#FFFFFF',
              borderRadius: '4px',
            }}
          variant="contained"
          >
          {message.okButtonLabel ?? 'OK'}
        </Button>
        {message && message.addActionDescription && message.additionalAction && (
          <Button
            onClick={additionalAction}
            className='feedbackDialogAddActionButton'
            style={{ marginTop: '24px' }}
            variant="outlined"
          >
            {message.addActionDescription}
          </Button>
        )}
        {message && message.showCloseButton && (
          <Button
            onClick={() => setOpen(false)}
            style={{
              marginTop: '16px',
              color: '#f5f5f5',
              textDecorationLine: 'underline',
            }}
            variant="text"
          >
            Fechar
          </Button>
        )}
      </Grid>
    </DialogContent>
    </Dialog >
  );
};
