import * as yup from 'yup';
import { Link, TextField, Button, Grid, Typography, Paper, Box, Divider } from '@mui/material';
import { login } from "../../services/auth.service";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AutheticatedContext  } from '../../context/AuthProvider';


const validationSchema = yup.object({
  username: yup.string()
    .min(3, "The username must be at least 3 characters.")
    .max(20, "The username must not exceed 20 characters.")
    .required("This field is required!"),
  password: yup.string()
    .min(6, "The password must be at least 6 characters.")
    .max(40, "The password must not exceed 40 characters.")
    .required("This field is required!"),


});

export  default  function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated , isAuth } = AutheticatedContext ();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      try {
        await login(
          values.username,
          values.password,
         
        )
      
        setIsAuthenticated(true)
       
        console.log('sucesso', setIsAuthenticated)
        console.log('is auth login', isAuth)
        navigate('/home');
      } catch (error) {

      }
     }
    
  });

  const handleNavigate = () => {
    navigate('/home');
  };

  return (
    <>

      <Grid
        container
        sx={{
          flex: '1 1 auto',
          height: '100vh',
          width: '100%',
        }}
      >
        <Grid
          xs={12}
          lg={12}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #fcf49b 0%, #e9df87 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            },
            height: '100%',
            width: '100%'
          }}

        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 400,
                height: 400,
              },
            }}
          >
            <Paper elevation={3}>
              <Typography variant="h5"
                sx={{
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
               Login
              </Typography>
              <Divider />
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginLeft: '10%',
                  marginTop: '3%'
                }}

              >
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    sx={{
                      width: 300,
                      marginLeft: '5%'
                    }}
                  />
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{
                      width: 300,
                      marginLeft: '5%'
                    }}
                  />
                  <Typography
                color="text.secondary"
                variant="body2"
                sx={{
                  marginLeft: '20%'
                }}
              >
               Ainda não tem uma conta?
                <Link
                  href="/"
                  underline="hover"
                  variant="subtitle2"
                >
                  Cadastre-se
                </Link>
                </Typography>
                  <Button color="primary" variant="contained" fullWidth type="submit"
                    sx={{
                      marginLeft: '20%',
                      width: '50%'
                    }}
                    onClick={handleNavigate}
                  >
                    Login
                  </Button>
                  <Typography
                color="text.secondary"
                variant="body2"
                sx={{
                  marginLeft: '30%'
                }}
              >
               Esqueceu sua senha?
                <Link
                  href="/password-reset"
                  underline="hover"
                  variant="subtitle2"
                >
                  Clique aqui
                </Link>
                </Typography>
                </form>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>




    </>

  );
}
