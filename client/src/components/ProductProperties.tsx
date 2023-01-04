import { Close, Delete } from "@mui/icons-material";
import {
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  MenuList,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ProductProp } from "../features/admin/products/productPropsSlice";

interface ProductPropertiesProps {
  propValue: ProductProp;
  propsList: { [propName: string]: ProductProp[] };
  handleSelectProductProp: (
    propName: string,
    productPropType: ProductProp | null
  ) => void;
  handleAddNewProp: (modelName: string, name: string) => void;
  handleDeleteProp: (modelName: string, id: number) => void;
  hasSecondaryAction?: boolean;
}

const ProductProperties = ({
  propValue,
  propsList,
  handleSelectProductProp,
  handleAddNewProp,
  handleDeleteProp,
  hasSecondaryAction,
}: ProductPropertiesProps) => {
  const propName = Object.keys(propsList)[0];
  const propsArray = Object.values(propsList)[0];

  const filterOptions = (options: ProductProp[], { inputValue }: any) => {
    const filteredOptions = options.filter((option: ProductProp) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (filteredOptions.length === 0 && hasSecondaryAction) {
      return [{ id: 0, name: `Add new ${inputValue}` }, ...filteredOptions];
    }
    return filteredOptions;
  };

  const handleChange = (event: any, value: ProductProp | null) => {
    if (value && value.id === 0) {
      handleAddNewProp(propName + "s", value.name.replace("Add new ", ""));
    } else {
      handleSelectProductProp(propName, value);
    }
  };

  return (
    <FormControl sx={{ m: 1, width: 200, mt: 3 }}>
      <Autocomplete
        // open
        // disablePortal
        value={propValue}
        defaultValue={{ id: 0, name: "" }}
        id={`${propName}-selectbox`}
        options={propsArray}
        renderOption={(props, option) => {
          return (
            <ListItem
              {...props}
              role="option"
              key={`${option.id}-${propName}`}
              secondaryAction={
                hasSecondaryAction ? (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteProp(propName + "s", option.id)}
                  >
                    <Delete />
                  </IconButton>
                ) : (
                  <></>
                )
              }
            >
              <ListItemButton onClick={(e) => handleChange(e, option)}>
                <ListItemText primary={option.name} />
              </ListItemButton>
            </ListItem>
            // <MenuItem>{option.name}</MenuItem>
          );
        }}
        filterOptions={filterOptions}
        getOptionLabel={(option: ProductProp) => {
          return option.name;
        }}
        isOptionEqualToValue={(option, value) =>
          option.id === value.id || value.id === 0
        }
        renderInput={(params) => (
          <TextField {...params} label={propName} variant="outlined" />
        )}
        onChange={(e: any, inputValue) => {
          handleChange(e, inputValue);
        }}
      />
    </FormControl>
  );
};

export default ProductProperties;
