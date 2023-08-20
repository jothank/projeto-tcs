import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
  DialogContent,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';

import React, { useState } from 'react';
import '../styles.css';
import CustomTextField from '../../../components/CustomTextField';
import { useNewPasswordContext } from '../../../context/newPasswordContext';
import { changePasswordAPI } from '../../../services/users.services';

const NewPassordForm: React.FC = () => {

  const {
    addPasswordErrors,
    addNewPassword,
    newPassword,
    passwordError
  } = useNewPasswordContext()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  
  const errorValidation = async (event: any) => {

    let error = '';
    if (event.target.value.length > 4 && newPassword.password === newPassword.confirmPassword) {
      error= '';
    }
    else if (newPassword.password !== newPassword.confirmPassword) {
      error = '*As senhas devem ser iguais nos dois campos!'
    }
    else if (event.target.value.length < 5) {
      error = '*As senhas devem no mínimo 5 caractéres'
    }

    addPasswordErrors({ ...passwordError, [event.target.name]: error });
  }

  return (
    <DialogContent>
      <Typography
        variant="subtitle1"
        style={{ margin: '2rem 0 1rem', color: '#323232', fontWeight: '600' }}

      >
        Digite uma nova senha:
      </Typography>
      <Grid container direction="column" spacing={2}>

        <Grid item xs>
          <CustomTextField
            id="password"
            name="password"
            label="Senha"
            autoComplete="off"
            placeholder="Senha"
            size="medium"
            value={newPassword.password}
            onChange={(e) => addNewPassword({ ...newPassword, password: e.target.value })}
            InputLabelProps={{ required: true }}
            error={!!passwordError.confirmPassword}
            InputProps={{
              type: showPassword ? 'text' : 'password',
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
            {passwordError.confirmPassword}
          </FormHelperText>
        </Grid>
        <Grid item>
          <CustomTextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar Senha"
            autoComplete="off"
            placeholder="Senha"
            size="medium"
            error={!!passwordError.confirmPassword}
            value={newPassword.confirmPassword}
            onBlur={errorValidation}
            onChange={(e) => addNewPassword({ ...newPassword, confirmPassword: e.target.value })}
            InputLabelProps={{ required: true }}
            InputProps={{
              type: showConfirmPass ? 'text' : 'password',
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {showConfirmPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
            <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
          {passwordError.confirmPassword}
        </FormHelperText>
        </Grid>
      
      </Grid>
    </DialogContent>
  );
};
export default NewPassordForm;
