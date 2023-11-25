import { FieldArray } from "formik";
import {
  FeedstocksSelect,
  ProductInput,
} from "components/Product/InputProduct";
import UnitSelect from "components/SelectOptions/SelectOptions";
import { FeedstockType } from "types/Feedstock.type";
import { FormControl, IconButton } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { options } from "utils/FeedstockUnit";

interface ProductArrayFieldProps {
  values: any;
  feedstockList: FeedstockType[];
}

interface ProductArrayFieldProps {
  values: any;
  feedstockList: FeedstockType[];
  setFieldValue: (field: string, value: any) => void;
}

const ProductArrayField: React.FC<ProductArrayFieldProps> = ({
  values,
  feedstockList,
  setFieldValue,
}) => {
  return (
    <FieldArray name="products">
      {({ push, remove }) => (
        <div>
          {values.products.map((product: any, index: number) => (
            <div key={index}>
              <FormControl fullWidth>
                <FeedstocksSelect
                  label="Insumo"
                  name={`products[${index}].feedstock.id`}
                  feedstocks={feedstockList}
                  value={product.feedstock.id || ""}
                  onChange={(value: any, selectedFeedstock: any) => {
                    setFieldValue(
                      `products[${index}].feedstock`,
                      selectedFeedstock
                    );
                  }}
                />
                <ProductInput
                  name={`products[${index}].quantity`}
                  label="Quantidade"
                  type="number"
                />
                <UnitSelect
                  name={`products[${index}].unit`}
                  label="Unidade"
                  options={options}
                />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconButton onClick={() => remove(index)}>
                    <RemoveIcon sx={{ color: "red" }} />
                  </IconButton>
                </div>
              </FormControl>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconButton onClick={() => push({ feedstock: { id: "" }, quantity: 0, unit: "", price: 0 })}>
              <AddIcon sx={{ color: "green" }} />
            </IconButton>
          </div>
        </div>
      )}
    </FieldArray>
  );
};

export default ProductArrayField;
