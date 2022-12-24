import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../app/store";
import ProductPropsDataService from "../../../services/products/productprops.services";
import Helper from "../../../components/helper";

export const loadProductProperties = createAsyncThunk(
  "productProps/loadProductProperties",
  async () => {
    const res = ProductPropsDataService.getAll()
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

export interface ProductProp {
  id: number;
  name: string;
}

export interface ProductPropsState {
  dimensionsList: ProductProp[];
  brandsList: ProductProp[];
  materialsList: ProductProp[];
  categoriesList: ProductProp[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: ProductPropsState = {
  dimensionsList: [],
  brandsList: [],
  materialsList: [],
  categoriesList: [],
  isLoading: false,
  hasError: false,
};

export const productPropsSlice = createSlice({
  name: "productProps",
  initialState,
  reducers: {
    selectProps: (state, action: PayloadAction<number>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProductProperties.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadProductProperties.fulfilled, (state, action) => {
        state.brandsList = action.payload.brandsList;
        state.materialsList = action.payload.materialsList;
        state.categoriesList = action.payload.categoriesList;
        state.dimensionsList = action.payload.dimensionsList;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadProductProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const {} = productPropsSlice.actions;

export const selectProductProps = (state: RootState) => state.productProps;

export default productPropsSlice.reducer;
