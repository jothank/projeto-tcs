import React from "react";
import { Field, useField, useFormikContext } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { RegisterInputProps } from "types/user.type";
import { Feedstock } from "components/Product/AddProduct";
import { Product } from "./editProduct";

export const ProductInput: React.FC<RegisterInputProps> = ({
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
        margin="dense"
        error={meta.touched && meta.error !== undefined}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    )}
  </Field>
);

interface FeedstockSelectProps {
  label: string;
  name: string;
  feedstocks: Feedstock[];
  value?: string;
  onChange?: (value: string, feedstock: Feedstock) => void;
}

export const FeedstocksSelect: React.FC<FeedstockSelectProps> = ({
  label,
  name,
  feedstocks,
  value = "",
  onChange,
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: any) => (
        <FormControl fullWidth margin="dense">
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            {...field}
            value={value}
            error={meta.touched && meta.error !== undefined}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
              if (onChange) {
                const selectedFeedstock = feedstocks.find(
                  (f) => f.id === e.target.value
                );
                onChange(e.target.value as string, selectedFeedstock!);
              }
              form.setFieldValue(name, e.target.value as string);
            }}
          >
            <MenuItem value="" disabled>
              Selecione um item
            </MenuItem>
            {feedstocks.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
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

interface FeedstockType {
  id: string | number;
  name: string;
}

interface GetFeedstocksSelectProps {
  label: string;
  name: string;
  feedstocks: FeedstockType[];
}

interface GetFeedstocksSelectProps {
  label: string;
  name: string;
  feedstocks: FeedstockType[];
}

export const GetFeedstocksSelect: React.FC<GetFeedstocksSelectProps> = ({ feedstocks, ...props }) => {
  return (
      <Field {...props} as={Select}>
          <MenuItem value="" disabled>
              Select a feedstock
          </MenuItem>
          {feedstocks.map((feedstock) => (
              <MenuItem key={feedstock.id} value={feedstock.id}>
                  {feedstock.name}
              </MenuItem>
          ))}
      </Field>
  );
};