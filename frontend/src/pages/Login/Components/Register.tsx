import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, TextField, Button, Box, Paper, Typography, Divider, Link } from "@mui/material";
import { register } from '../../../services/auth.service';


const validationSchema = yup.object({
  username: yup.string()
  .min(3, "The username must be at least 3 characters.")
  .max(20, "The username must not exceed 20 characters.")
  .required("This field is required!"),
email: yup.string()
  .email("This is not a valid email.")
  .required("This field is required!"),
password1: yup.string()
  .min(6, "The password must be at least 6 characters.")
  .max(40, "The password must not exceed 40 characters.")
  .required("This field is required!"),
password2: yup.string()
  .oneOf([yup.ref("password1"), ""], "Passwords must match")
  .required("This field is required!"),
firstName: yup.string()
  .min(3, "The first name must be at least 3 characters.")
  .max(20, "The first name must not exceed 20 characters.")
  .required("This field is required!"),
lastName: yup.string()
  .min(3, "The last name must be at least 3 characters.")
  .max(20, "The last name must not exceed 20 characters.")
  .required("This field is required!"),
});

export default function Register() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password1: '',
      password2: '',
      firstName: '',
      lastName: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      try {
        await register(
          values.username,
          values.email,
          values.password1,
          values.password2,
          values.firstName,
          values.lastName
          
          )
      } catch (error) {
        
      }
    },
  });

  return (
    <Grid
    container
    sx={{ 
      flex: '1 1 auto' ,
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
            width: 600,
            height: 700,
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
            Cadastro
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
            width: 500
          }}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            width: 500
          }}
        />
        <TextField
          fullWidth
          id="password"
          name="password1"
          label="Password"
          type="password"
          value={formik.values.password1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password1 && Boolean(formik.errors.password1)}
          helperText={formik.touched.password1 && formik.errors.password1}
          sx={{
            width: 500
          }}
        />
        <TextField
          fullWidth
          id="password2"
          name="password2"
          label="Password"
          type="password"
          value={formik.values.password2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password1 && Boolean(formik.errors.password2)}
          helperText={formik.touched.password1 && formik.errors.password2}
          sx={{
            width: 500
          }}
        />
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="Sobrenome"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          sx={{
            width: 500
          }}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Sobrenome"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          sx={{
            width: 500
          }}
        />
           <Typography
                color="text.secondary"
                variant="body2"
                sx={{
                  marginLeft: '62%'
                }}
              >
               Já tem uma conta?
                <Link
                  href="/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Login
                </Link>
              </Typography>
        <Button color="primary" variant="contained" fullWidth type="submit"
        sx={{
          marginLeft: '20%',
          width: '50%'
        }}
        >
          Submit
        </Button>
      </form>
      </Grid>
      </Paper>
      
      </Box>
      </Grid>
    </Grid>
  );
};

