import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme : Theme) =>
  createStyles({
    docContainer : {
      width: '100%', 
      margin: '0'
    },

    docLogradouro : {
      paddingRight: '1rem',
      marginTop: '1rem',
      [theme.breakpoints.down('xs')]: {
        paddingRight: '0',
      },
    },

    subTitleStepper : {
      margin: '2rem 0 1rem', 
      color: '#323232', 
      fontWeight: 600
    },
    dialogContentContainer : {
      padding: 0
    }
  }),
);
