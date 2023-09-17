import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { CompanyType } from "types/company.types";
import { RegisterValidation } from "utils/validationForm";
import { ButtonForms, ContainerForms, FormInput } from "components/FormGroup";
import { getErro, getSuccess } from "utils/ModalAlert";

const CompanyValues: CompanyType = {
  name: "",
  cnpj: "",
  email: "",
  phone: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  country: "",
  zipcode: "",
};

const Company: React.FC = () => {
  const handleRegister = async (
    company: CompanyType,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      //   await registerCompany(company);
      console.log(company);
      getSuccess("Company registered successfully.");
      resetForm();
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={CompanyValues}
        validationSchema={RegisterValidation}
        onSubmit={handleRegister}
      >
        <Form>
          <ButtonForms>
            <Button variant="contained" type="submit" sx={{ width: "50%" }}>
              Cadastrar
            </Button>
          </ButtonForms>
        </Form>
      </Formik>
    </div>
  );
};

export default Company;
