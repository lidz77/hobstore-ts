import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { ProductProp } from "../features/admin/products/productPropsSlice";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ProductPropertiesProps {
  propsList: object;
  // propsList: ProductProp[];
}

const ProductProperties = ({ propsList }: ProductPropertiesProps) => {
  const [prop, setProp] = useState<ProductProp>();
  const propName = Object.keys(propsList)[0];
  return (
    <FormControl sx={{ m: 1, width: 200, mt: 3 }}>
      <Select
        displayEmpty
        value={""}
        onChange={() => {}}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Select {propName}</em>;
          }
          return selected;
        }}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled>
          <em>Select {propName}</em>
        </MenuItem>
        {Object.values(propsList)[0].map((item: ProductProp) => (
          <MenuItem key={item.id + propName} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductProperties;
