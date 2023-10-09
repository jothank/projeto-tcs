import React from "react";
import { Field } from "formik";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";

interface SelectFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export const UnitSelect: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: any) => (
        <FormControl fullWidth margin="dense">
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            value=""
            {...field}
            error={meta.touched && meta.error !== undefined}
            onChange={(e) => form.setFieldValue(name, e.target.value)}
          >
            {options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {meta.touched && meta.error && (
            <FormHelperText error={true}>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};

export default UnitSelect;


