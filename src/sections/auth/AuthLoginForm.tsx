import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuthContext } from '../../auth/useAuthContext';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import NewUser from '../../pages/Login/NewUser';
import PasswordRecovery from '../../pages/Login/PassRecover';
import { NewPasswordProvider } from '../../context/newPasswordContext';


type FormValuesProps = {
  username: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [openNewPassword, setOpenNewPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    cpf: Yup.string().required('Por favor, digite seu cpf'),
    password: Yup.string().required('Por favor, digite sua senha'),
  });

  const defaultValues = {
    username: '07980274954',
    password: '@Testando123',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.username, data.password);
    } catch (error) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.response.data.message || 'Credenciais inválidas',
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="username" label="CPF" />

        <RHFTextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link onClick={() => setOpenNewPassword(true)} variant="body2" style={{ cursor: 'pointer' }} color="inherit" underline="always">
          Recuperar senha.
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: '#001d36',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: '#022a4c',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Entrar
      </LoadingButton>
      <LoadingButton
        onClick={() => setOpenNewUser(true)}
        fullWidth
        color="inherit"
        size="large"
        variant="outlined"
        sx={{
          color: '#001d36',
          marginTop: '1rem',
          borderColor: '#001d36',
          '&:hover': {
            color: '#001d36',
          },
        }}

      >
        Criar conta
      </LoadingButton>

      <NewUser
        open={openNewUser}
        handleClose={() => setOpenNewUser(false)}
      />
      
      <NewPasswordProvider>
        <PasswordRecovery
          open={openNewPassword}
          handleClose={() => setOpenNewPassword(false)}
        />
      </NewPasswordProvider>
    </FormProvider>


  );
}
