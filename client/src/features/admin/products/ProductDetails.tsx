import { Close, Done } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Slide,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { CirclePicker, ColorResult } from "react-color";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import LoadingBackdrop from "../../../components/LoadingBackdrop";
import ProductProperties from "../../../components/ProductProperties";
import { ProductProp, ProductPropsState } from "./productPropsSlice";
import { Product } from "./productsSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const colorsArray = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"];

interface ProductDetailsProps {
  productsIsLoading: boolean;
  openDialog: boolean;
  productProperties: ProductPropsState;
  productDetails: Product;
  handleLoadProductProps: () => void;
  handleSelectProductProp: (
    propName: string,
    productPropType: ProductProp
  ) => void;
  handleInputChange: (field: string, text: string | number) => void;
}

const ProductDetails = ({
  productsIsLoading,
  openDialog,
  productProperties,
  handleLoadProductProps,
  handleSelectProductProp,
  productDetails,
  handleInputChange,
}: ProductDetailsProps) => {
  const [color, setColor] = useState<string>(productDetails.color);
  const [available, setAvailabe] = useState<boolean>(productDetails.available);
  useEffect(() => {
    handleLoadProductProps();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {productsIsLoading ? (
        <LoadingBackdrop />
      ) : (
        <Dialog
          open={openDialog}
          fullScreen
          TransitionComponent={Transition}
          sx={{
            margin: (theme) => theme.spacing(2),
          }}
        >
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <DialogTitle
              sx={{
                m: 0,
                p: 2,
                padding: (theme) => theme.spacing(2),
                background: "#1986D2",
              }}
            >
              Dialog title
              <IconButton
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <Box component={"form"} id="product-details">
              <Grid container spacing={2}>
                <Stack
                  sx={{
                    m: 3,
                  }}
                >
                  <FormControl>
                    <TextField
                      label="Product Name"
                      id="product-name"
                      placeholder="Product Name"
                      aria-describedby="my-helper-text"
                      required
                      onBlur={(e) => {
                        handleInputChange("title", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl sx={{ pt: 2 }}>
                    <TextField
                      label="Description"
                      id="product-description"
                      rows={12}
                      placeholder="Description"
                      multiline
                      onBlur={(e) => {
                        handleInputChange("description", e.target.value);
                      }}
                    ></TextField>
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Switch
                        value={available}
                        onChange={() => setAvailabe(!available)}
                      />
                    }
                    label={"Available"}
                  />
                </Stack>
                <Stack>
                  <ProductProperties
                    propsList={{ brand: productProperties.brandsList }}
                    handleSelectProductProp={handleSelectProductProp}
                  />
                  <ProductProperties
                    propsList={{ dimension: productProperties.dimensionsList }}
                    handleSelectProductProp={handleSelectProductProp}
                  />
                  <ProductProperties
                    propsList={{ material: productProperties.materialsList }}
                    handleSelectProductProp={handleSelectProductProp}
                  />
                  <ProductProperties
                    propsList={{ category: productProperties.categoriesList }}
                    handleSelectProductProp={handleSelectProductProp}
                  />
                  <Typography variant="body1">Color:{color}</Typography>
                  <CirclePicker
                    color={color}
                    onChange={(color: ColorResult) => setColor(color.hex)}
                    colors={colorsArray}
                  />
                  <FormControl sx={{ pt: 2 }}>
                    <TextField
                      label="Price"
                      id="product-price"
                      placeholder="Price"
                      type="number"
                      onBlur={(e) => {
                        handleInputChange("price", e.target.value);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      variant="filled"
                    />
                  </FormControl>
                </Stack>
              </Grid>
            </Box>
          </Paper>
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="Done"
              type="submit"
              icon={<Done />}
            />
            <BottomNavigationAction
              label="Cancel"
              type="button"
              icon={<Close />}
            />
          </BottomNavigation>
        </Dialog>
      )}
    </Box>
  );
};

export default ProductDetails;
