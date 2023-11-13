import React from "react";
import { Field } from "formik";
import { CompanyInputProps, CPPJCompanyInputProps } from "types/company.types";
import { TextField } from "@mui/material";

function formatCNPJ(value: string) {
  return value
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substr(0, 18);
}

export const CompanyInput: React.FC<CompanyInputProps> = ({
  name,
  label,
  type,
}) => (
  <Field name={name}>
    {({ field, meta }: any) => (
      <TextField
        {...field}
        label={label}
        type={type}
        fullWidth
        margin="dense"
        error={meta.touched && meta.error !== undefined}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    )}
  </Field>
);

export const CNPJCompanyInput: React.FC<CPPJCompanyInputProps> = ({
  name,
  label,
}) => (
  <Field name={name}>
    {({ field, meta }: any) => (
      <TextField
        {...field}
        value={formatCNPJ(field.value)}
        label={label}
        type="text"
        fullWidth
        inputProps={{ maxLength: 18 }}
        margin="dense"
        error={meta.touched && meta.error !== undefined}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    )}
  </Field>
);

function formatPhoneNumber(value: string) {
  const numbers = value.replace(/[^\d]/g, ""); 
  
  const countryCode = numbers.substr(0, 2);
  const areaCode = numbers.substr(2, 2);
  const localNumber = numbers.substr(4);
  
  if (localNumber.length <= 8) {
    return `+${countryCode} ${areaCode} ${localNumber.replace(/(\d{4})(\d{4})/, "$1-$2")}`;
  } else {
    return `+${countryCode} ${areaCode} ${localNumber.replace(/(\d{1})(\d{4})(\d{4})/, "$1 $2-$3")}`;
  }
}

export const PhoneNumberInput: React.FC<{ name: string; label: string }> = ({
  name,
  label,
}) => (
  <Field name={name}>
    {({ field, meta }: any) => (
      <TextField
        {...field}
        value={formatPhoneNumber(field.value)}
        label={label}
        type="text"
        fullWidth
        inputProps={{ maxLength: 17 }}
        margin="dense"
        error={meta.touched && meta.error !== undefined}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    )}
  </Field>
);
