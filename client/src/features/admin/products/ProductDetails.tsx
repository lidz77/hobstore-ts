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
  InputAdornment,
  Paper,
  Slide,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useAppDispatch } from "../../../app/hooks";
import ImagesUploader from "../../../components/ImagesUploader";
import LoadingBackdrop from "../../../components/LoadingBackdrop";
import ProductProperties from "../../../components/ProductProperties";
import { ProductProp, ProductPropsState } from "./productPropsSlice";
import {
  Product,
  removeImageInfo,
  setImagesInfo,
  uploadImages,
} from "./productsSlice";

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
  imagesHandlers: { imagesList: []; imagesInfo: {}[] };
  handleLoadProductProps: () => void;
  handleSelectProductProp: (
    propName: string,
    productPropType: ProductProp | null
  ) => void;
  handleInputChange: (field: string, text: string | number | boolean) => void;
  handleDialog: () => void;
  handleAddNewProp: (modelName: string, name: string) => void;
  handleDeleteProp: (modelName: string, id: number) => void;
  handleSubmit: () => void;
}

const ProductDetails = ({
  imagesHandlers,
  productsIsLoading,
  openDialog,
  productProperties,
  handleLoadProductProps,
  handleSelectProductProp,
  productDetails,
  handleInputChange,
  handleDialog,
  handleAddNewProp,
  handleDeleteProp,
  handleSubmit,
}: ProductDetailsProps) => {
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   handleLoadProductProps();
  // }, []);
  const [imageFiles, setImageFiles] = useState<FileList>();
  const [previewImages, setPreviewImages] = useState<File[]>([]);

  const handleRemoveImage = (idx: number) => {
    if (!imageFiles) {
      return;
    }
    const dt = new DataTransfer();
    for (let index = 0; index < imageFiles.length; index++) {
      const image = imageFiles[index];
      if (idx !== index) {
        dt.items.add(image); // here you exclude the file. thus removing it.
      }
    }
    setImageFiles(dt.files);
    setPreviewImages((prev) =>
      prev.filter((item, index) => {
        return index !== idx;
      })
    );
    dispatch(removeImageInfo(idx));
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files as FileList | undefined;

    setPreviewImages(Array.from(files ?? []));
    setImageFiles(files);
    Array.prototype.forEach.call(files, (item) => {
      dispatch(
        setImagesInfo({
          percentage: 0,
          name: item.name,
        })
      );
    });
  };

  const handleUploadImages = () => {
    if (!imageFiles) {
      return;
    }
    dispatch(uploadImages(imageFiles));
  };

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
              {productDetails.id === 0 ? "Add new product" : "Edit product"}
              <IconButton
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
                onClick={() => {
                  handleDialog();
                  setPreviewImages([]);
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <Box component={"form"} id="product-details">
              <Grid container spacing={1} flexGrow={1}>
                <Grid item xs={3}>
                  <Stack
                    sx={{
                      m: 3,
                    }}
                  >
                    <FormControl>
                      <TextField
                        label="Product Name"
                        id="product-name"
                        aria-describedby="my-helper-text"
                        required
                        onBlur={(e) => {
                          handleInputChange("title", e.target.value);
                        }}
                        defaultValue={productDetails.title}
                      />
                    </FormControl>
                    <FormControl sx={{ pt: 2 }}>
                      <TextField
                        label="Description"
                        id="product-description"
                        rows={12}
                        multiline
                        onBlur={(e) => {
                          handleInputChange("description", e.target.value);
                        }}
                        defaultValue={productDetails.description}
                      />
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={productDetails.available}
                          onChange={(e, checked) => {
                            handleInputChange("available", checked);
                          }}
                        />
                      }
                      label={"Available"}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Stack>
                    <ProductProperties
                      handleDeleteProp={handleDeleteProp}
                      handleAddNewProp={handleAddNewProp}
                      propsList={{ brand: productProperties.brands }}
                      handleSelectProductProp={handleSelectProductProp}
                      propValue={productDetails.brand}
                      hasSecondaryAction={true}
                    />
                    <ProductProperties
                      propValue={productDetails.dimension}
                      handleDeleteProp={handleDeleteProp}
                      handleAddNewProp={handleAddNewProp}
                      propsList={{ dimension: productProperties.dimensions }}
                      handleSelectProductProp={handleSelectProductProp}
                      hasSecondaryAction={true}
                    />
                    <ProductProperties
                      propValue={productDetails.material}
                      handleDeleteProp={handleDeleteProp}
                      handleAddNewProp={handleAddNewProp}
                      propsList={{ material: productProperties.materials }}
                      handleSelectProductProp={handleSelectProductProp}
                      hasSecondaryAction={true}
                    />
                    <ProductProperties
                      propValue={productDetails.category}
                      handleDeleteProp={handleDeleteProp}
                      handleAddNewProp={handleAddNewProp}
                      propsList={{ category: productProperties.categories }}
                      handleSelectProductProp={handleSelectProductProp}
                    />
                    <Typography variant="body1">
                      Color:{productDetails.color}
                    </Typography>
                    <CirclePicker
                      color={productDetails.color}
                      onChange={(color: ColorResult) =>
                        handleInputChange("color", color.hex)
                      }
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
                        defaultValue={productDetails.price}
                        variant="filled"
                      />
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack
                    sx={{
                      maxWidth: 1200,
                    }}
                  >
                    <ImagesUploader
                      handleSelectFiles={handleSelectFiles}
                      handleRemoveImage={handleRemoveImage}
                      handleUploadImages={handleUploadImages}
                      previewImages={previewImages}
                      imagesInfo={imagesHandlers.imagesInfo}
                      isLoadingDetails={productDetails.isLoadingDetails}
                      imagesList={imagesHandlers.imagesList}
                      productId={productDetails.id}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="Done"
              type="submit"
              icon={<Done />}
              onClick={handleSubmit}
            />
            <BottomNavigationAction
              label="Cancel"
              type="button"
              icon={<Close />}
              onClick={() => {
                handleDialog();
                setPreviewImages([]);
              }}
            />
          </BottomNavigation>
        </Dialog>
      )}
    </Box>
  );
};

export default ProductDetails;
