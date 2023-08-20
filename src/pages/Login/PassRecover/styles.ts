import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import loginBackground from 'assets/images/login-background.png';

export const useStyles = makeStyles(theme =>
  createStyles({
    dialogContentContainer : {
      padding: 0
    },
    
    subTitleStepper : {
      margin: '2rem 0 1rem', 
      color: '#323232', 
      fontWeight: 600
    },
    newPassContainer : {
      width: '100%', 
      margin: '0'
    },
  }),
);
