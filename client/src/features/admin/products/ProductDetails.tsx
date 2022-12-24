import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Paper,
  Slide,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect } from "react";
import LoadingBackdrop from "../../../components/LoadingBackdrop";
import ProductProperties from "../../../components/ProductProperties";
import { ProductPropsState } from "./productPropsSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ProductDetailsProps {
  productsIsLoading: boolean;
  openDialog: boolean;
  productProperties: ProductPropsState;
  handleLoadProductProps: () => void;
}

const ProductDetails = ({
  productsIsLoading,
  openDialog,
  productProperties,
  handleLoadProductProps,
}: ProductDetailsProps) => {
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
                    <InputLabel htmlFor="product-name">Name:</InputLabel>
                    <Input
                      id="product-name"
                      aria-describedby="my-helper-text"
                      required
                    ></Input>
                    <FormControl sx={{ pt: 2 }}>
                      <TextField
                        label="Description"
                        id="product-description"
                        rows={12}
                        placeholder="Description"
                        multiline
                      ></TextField>
                    </FormControl>
                  </FormControl>
                  <FormControlLabel control={<Switch />} label={"Available"} />
                </Stack>
                <Stack>
                  <ProductProperties
                    propsList={{ Brand: productProperties.dimensionsList }}
                  />
                  <ProductProperties
                    propsList={{ Dimension: productProperties.dimensionsList }}
                  />
                  <ProductProperties
                    propsList={{ Material: productProperties.materialsList }}
                  />
                  <ProductProperties
                    propsList={{ Category: productProperties.categoriesList }}
                  />
                </Stack>
              </Grid>
            </Box>
          </Paper>
        </Dialog>
      )}
    </Box>
  );
};

export default ProductDetails;
