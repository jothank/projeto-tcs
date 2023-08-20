import { DialogContent, Typography } from '@material-ui/core';
import { CircularProgress, FormHelperText, InputAdornment } from '@mui/material';
import CustomTextField from '../../../components/CustomTextField';
import '../styles.css';
import { useNewPasswordContext } from '../../../context/newPasswordContext';
import { sendOtpAPI } from '../../../services/util.services';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useStyles } from '../PassRecover/styles';

const NewPasswordEmail = () => {

  const {
    addPasswordErrors,
    addNewPassword,
    newPassword,
    passwordError 
  } = useNewPasswordContext()

  const [loading ,setLoading] = useState(false);
  const [checkMail ,setCheckMail] = useState(false);
  const classes = useStyles();

  const errorValidation = async (event: any) => {

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (event.target.value.match(validRegex)) {
      setLoading(true)
      sendOtpAPI(newPassword?.email).then(res => {
        setCheckMail(true)
        addPasswordErrors({ ...passwordError, [event.target.name]: '' });
      }).catch(err => {
        addPasswordErrors({ ...passwordError, [event.target.name]: 'E-mail não cadastrado!' });
        setCheckMail(false)
      }).finally(()=> {
        setLoading(false)
      })
    } else {
      addPasswordErrors({ ...passwordError, [event.target.name]: 'Por favor, digite um e-mail válido!' });
    }
  }
  return (
    <DialogContent className={classes.dialogContentContainer}>
      <Typography
        variant="subtitle1"
        className={classes.subTitleStepper}
      >
        Digite seu e-mail:
      </Typography>

      <CustomTextField
        name="email"
        type="standard"
        label="E-mail"
        fullWidth
        value={newPassword?.email}
        onBlur={errorValidation}
        onChange={(e) => addNewPassword({ ...newPassword, email: e.target.value })}
        error={!!passwordError.email}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {loading
                ? <CircularProgress style={{ width: '20px', height: '20px', margin: '10px', color: '#dfdfdf' }} />
                : checkMail && <CheckIcon style={{ color: '#449364' }} />
              }
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
        {passwordError.email}
      </FormHelperText>
    </DialogContent>
  );
};
export default NewPasswordEmail;
