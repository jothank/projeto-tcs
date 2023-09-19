import { Button, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { CompanyType } from "types/company.types";
import { CompanyValidation } from "utils/validationCompany";
import { getErro, getSuccess } from "utils/ModalAlert";
import { ContainerCompany } from "components/Company/ContainerCompany";
import {
  CompanyInput,
  CNPJCompanyInput,
} from "components/Company/InputCompany";
import { setCompany } from "services/company.service";

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
      setCompany(company.name, company.cnpj, company.email, company.phone, company.street, company.number, company.neighborhood, company.city, company.state, company.country, company.zipcode);
      console.log(company);
      getSuccess("Company registered successfully.");
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <div>
      <ContainerCompany titleForm="Cadastro de Empresa" sizeForm="800px">
        <Formik
          initialValues={CompanyValues}
          validationSchema={CompanyValidation}
          onSubmit={handleRegister}
        >
          <Form>
            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
              <CNPJCompanyInput name="cnpj" label="CNPJ" />
              <CompanyInput name="name" label="Nome" type="text" />
            </Stack>

            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
              <CompanyInput name="email" label="Email" type="email" />
              <CompanyInput name="phone" label="Telefone" type="text" />
            </Stack>

            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
              <CompanyInput name="zipcode" label="CEP" type="text" />
              <CompanyInput name="street" label="Rua" type="text" />
            </Stack>

            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
              <CompanyInput name="number" label="Número" type="text" />
              <CompanyInput name="neighborhood" label="Bairro" type="text" />
            </Stack>

            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
              <CompanyInput name="city" label="Cidade" type="text" />
              <CompanyInput name="state" label="Estado" type="text" />
              <CompanyInput name="country" label="País" type="text" />
            </Stack>

            <Stack direction="row" justifyContent="center" marginTop={2}>
              <Button variant="contained" type="submit" sx={{ width: "50%" }}>
                Cadastrar
              </Button>
            </Stack>
          </Form>
        </Formik>
      </ContainerCompany>
    </div>
  );
};

export default Company;