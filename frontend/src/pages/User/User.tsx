import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import {
  passwordSchema,
  usernameSchema,
} from "utils/validations/validationForm";
import { getUser, updatePassword, updateUser } from "services/user.service";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { ContainerCompany } from "components/Company/ContainerCompany";
import { getErro } from "utils/ModalAlert";

interface PasswordChangeFormValues {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

const NameValidations = Yup.object().shape({
  username: usernameSchema,
  firstName: Yup.string()
    .min(3, `O ${name} deve ter pelo menos 3 caracteres.`)
    .max(20, `O ${name} não deve exceder 20 caracteres.`)
    .required("Este campo é obrigatório!"),
  lastName: Yup.string()
    .min(3, `O ${name} deve ter pelo menos 3 caracteres.`)
    .max(20, `O ${name} não deve exceder 20 caracteres.`)
    .required("Este campo é obrigatório!"),
});

const PasswordResetValidations = Yup.object().shape({
  oldPassword: passwordSchema,
  newPassword1: passwordSchema,
  newPassword2: Yup.string()
    .oneOf([Yup.ref("newPassword1"), ""], "As senhas devem ser iguais.")
    .required("Este campo é obrigatório!"),
});

const UserProfile: React.FC = () => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [oldUser, setOldUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser();
        setUser({
          username: response.username,
          firstName: response.first_name,
          lastName: response.last_name,
          email: response.email,
        });
        setOldUser({
          username: response.username,
          firstName: response.first_name,
          lastName: response.last_name,
          email: response.email,
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
      }
    };
    fetchData();
  }, []);

  const handlePasswordChange = async (values: PasswordChangeFormValues) => {
    try {
      setIsPasswordDialogOpen(false);
      const result = await Swal.fire({
        title: "Você tem certeza?",
        text: "Você deseja alterar sua senha?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, modificar!",
        cancelButtonText: "Não, cancelar",
      });
      if (result.isConfirmed) {
        const response = await updatePassword(values);
      }
    } catch (error) {
      getErro("Erro ao atualizar senha do usuário. Senha antiga incorreta.");
    }
  };

  const handleUserEdit = async (values: User) => {
    try {
      if (JSON.stringify(values) === JSON.stringify(oldUser)) {
        await Swal.fire({
          title: "Atenção!",
          text: "Não houve alteração nos dados.",
          icon: "warning",
          confirmButtonText: "Entendi",
        });
      } else {
        const result = await Swal.fire({
          title: "Você tem certeza?",
          text: "Você deseja modificar seus dados?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, modificar!",
          cancelButtonText: "Não, cancelar",
        });
        if (result.isConfirmed) {
          const response = await updateUser(values);
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário", error);
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <ContainerCompany titleForm="Editar Perfil" sizeForm="800px">
      <Formik
        initialValues={user}
        validationSchema={NameValidations}
        onSubmit={handleUserEdit}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field name="username">
                  {({ field, form, meta }: any) => (
                    <TextField
                      {...field}
                      label="Nome de Usuário"
                      fullWidth
                      margin="dense"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  value={values.email}
                  disabled
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="firstName">
                  {({ field, form, meta }: any) => (
                    <TextField
                      {...field}
                      label="Primeiro Nome"
                      fullWidth
                      margin="dense"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="lastName">
                  {({ field, form, meta }: any) => (
                    <TextField
                      {...field}
                      label="Último Nome"
                      fullWidth
                      margin="dense"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{ marginTop: 2, justifyContent: "space-between" }}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setIsPasswordDialogOpen(true)}
                >
                  Alterar Senha
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Salvar Alterações
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Dialog
        open={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
      >
        <DialogTitle>Alterar Senha</DialogTitle>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword1: "",
            newPassword2: "",
          }}
          validationSchema={PasswordResetValidations}
          onSubmit={handlePasswordChange}
        >
          {() => (
            <Form>
              <DialogContent>
                <Stack spacing={2}>
                  <Field name="oldPassword">
                    {({ field, form, meta }: any) => (
                      <TextField
                        {...field}
                        label="Senha Antiga"
                        fullWidth
                        margin="dense"
                        type="password"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                        placeholder="Senha Antiga"
                      />
                    )}
                  </Field>
                  <Field name="newPassword1">
                    {({ field, form, meta }: any) => (
                      <TextField
                        {...field}
                        label="Nova Senha"
                        fullWidth
                        margin="dense"
                        type="password"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                        placeholder="Nova Senha"
                      />
                    )}
                  </Field>
                  <Field name="newPassword2">
                    {({ field, form, meta }: any) => (
                      <TextField
                        {...field}
                        label="Confirme a Nova Senha"
                        fullWidth
                        margin="dense"
                        type="password"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                        placeholder="Confirme a Nova Senha"
                      />
                    )}
                  </Field>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsPasswordDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Alterar Senha
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </ContainerCompany>
  );
};

export default UserProfile;
