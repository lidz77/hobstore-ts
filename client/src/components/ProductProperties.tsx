import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
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
  handleSelectProductProp: (
    propName: string,
    productPropType: ProductProp
  ) => void;
}

const ProductProperties = ({
  propsList,
  handleSelectProductProp,
}: ProductPropertiesProps) => {
  const [name, setName] = useState<string>("");
  const propName = Object.keys(propsList)[0];
  const propsArray = Object.values(propsList)[0];
  const handleSelect = (e: SelectChangeEvent<string>) => {
    setName(e.target.value);
    const prop = propsArray.filter(
      (item: ProductProp) => item.name === e.target.value
    );
    handleSelectProductProp(propName, prop[0]);
  };
  return (
    <FormControl sx={{ m: 1, width: 200, mt: 3 }}>
      <Select
        displayEmpty
        value={name}
        onChange={handleSelect}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em> Select {propName}</em>;
          }
          return selected;
        }}
      >
        <MenuItem disabled value="">
          <em>Select {propName}</em>
        </MenuItem>
        {propsArray.map((item: ProductProp, index: number) => {
          return (
            <MenuItem key={index + propName} value={item.name}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ProductProperties;
