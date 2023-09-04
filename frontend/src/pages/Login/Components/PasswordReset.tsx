import React from "react";
import { Formik, Form, useFormik } from "formik";
import { passwordReset } from "../../../services/auth.service";
import { Box, Button, Grid, Link, Paper, Stack, TextField, Typography, Divider } from "@mui/material";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string()
    .min(3, "The username must be at least 3 characters.")
    .max(20, "The username must not exceed 20 characters.")
    .required("This field is required!"),
  password1: yup.string()
    .min(6, "The password must be at least 6 characters.")
    .max(40, "The password must not exceed 40 characters.")
    .required("This field is required!"),


});

export default function PasswordReset() {

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      try {
        await passwordReset(
          values.email,
        )
      } catch (error) {

      }
    },
  });

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
              Recuperar senha
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
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{
                    width: 350,
                   marginBottom: '5%'
                  }}
                />
              
                <Button color="primary" variant="contained" fullWidth type="submit"
                  sx={{
                    marginLeft: '20%',
                    width: '50%'
                  }}
                >
                  Login
                </Button>
              </form>
            </Grid>
          </Paper>
        </Box>
      </Grid>
    </Grid>




  </>
  )

}
