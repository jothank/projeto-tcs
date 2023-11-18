import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";
import { RegisterInputProps } from "types/user.type";

interface FormInputNumberProps {
  name: string;
  label: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean; 
}

const FormInputNumber: React.FC<FormInputNumberProps> = ({
  name,
  label,
  type,
  onChange,
  disabled, 
}) => (
  <Field name={name}>
    {({ field, meta, form }: any) => (
      <TextField
        {...field}
        label={label}
        type={type}
        margin="dense"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement;
          form.setFieldValue(field.name, target.value);
          if (onChange) {
            onChange(e);
          }
        }}
        disabled={disabled}
        error={meta.touched && meta.error !== undefined}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    )}
  </Field>
);

export { FormInputNumber };

const FormInputDate: React.FC<RegisterInputProps> = ({ name, label, type }) => {
  const handleDateChange = (event: any, setFieldValue: any) => {
    let value = event.target.value;
    if (type === "date") {
      const year = value.split("-")[0];
      if (year.length > 4) {
        value = `${year.substring(0, 4)}-${value.split("-")[1]}-${
          value.split("-")[2]
        }`;
      }
    }
    setFieldValue(name, value);
  };

  return (
    <Field name={name} label={label}>
      {({ field, meta, form: { setFieldValue } }: any) => (
        <TextField
          {...field}
          type={type}
          fullWidth
          margin="dense"
          error={meta.touched && meta.error !== undefined}
          helperText={meta.touched && meta.error ? meta.error : ""}
          onChange={(event) => handleDateChange(event, setFieldValue)}
        />
      )}
    </Field>
  );
};

export { FormInputDate };
