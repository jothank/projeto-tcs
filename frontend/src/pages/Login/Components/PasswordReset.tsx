import React from "react";
import { Button, Modal, Container, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import { passwordReset } from "services/auth.service";
import { FormInput } from "components/FormGroup";
import { PasswordResetValidation } from "utils/validations/validationForm";
import { getErro, getSuccess } from "utils/ModalAlert";

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordResetValues = {
  email: "",
};

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handlepasswordReset = async (values: typeof PasswordResetValues) => {
    try {
      await passwordReset(values.email);
      getSuccess("Email enviado com sucesso.");
      onClose();
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Grid
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          sx={{
            position: "relative",
            width: "400px",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
            "@media (max-width: 600px)": {
              width: "90%",
            },
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              alignItems: "end",
              right: "0",
              top: "0",
              color: "red",
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
          <Grid
            sx={{
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Recuperar Senha</h1>
          </Grid>
          <Formik
            initialValues={PasswordResetValues}
            validationSchema={PasswordResetValidation}
            onSubmit={handlepasswordReset}
          >
            <Form>
              <FormInput name="email" label="Email" type="email" />
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Button variant="contained" type="submit" sx={{ width: "50%" }}>
                  Enviar
                </Button>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Modal>
  );
};

export default PasswordResetModal;
