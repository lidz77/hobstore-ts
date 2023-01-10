import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import ProductPropsDataService from "../../../services/products/productprops.services";
import { selectProp } from "./productsSlice";

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

export const createNewProductProp = createAsyncThunk(
  "productProps/createNewProductProp",
  async (newProp: { modelName: string; name: string }, AppThunk) => {
    const res = ProductPropsDataService.create(newProp)
      .then((result) => {
        const propName = result.data.modelName.slice(0, -1);
        const productProp = result.data.result;
        AppThunk.dispatch(selectProp({ propName, productProp }));
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

export const deleteProductProp = createAsyncThunk(
  "productProps/deleteProductProp",
  async (args: { modelName: string; id: number }) => {
    const res = ProductPropsDataService.delete(args)
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

export type modelName = "materials" | "brands" | "dimensions";

export const emptyProductProps = (): ProductPropsState => ({
  dimensions: [{ id: 0, name: "" }],
  brands: [{ id: 0, name: "" }],
  materials: [{ id: 0, name: "" }],
  categories: [{ id: 0, name: "" }],
  isLoading: false,
  hasError: false,
});
export interface ProductPropsState {
  dimensions: ProductProp[];
  brands: ProductProp[];
  materials: ProductProp[];
  categories: ProductProp[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: ProductPropsState = emptyProductProps();

export const productPropsSlice = createSlice({
  name: "productProps",
  initialState,
  reducers: {
    selectProps: (state, action: PayloadAction<ProductProp>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProductProperties.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadProductProperties.fulfilled, (state, action) => {
        state.brands = action.payload.brands;
        state.materials = action.payload.materials;
        state.categories = action.payload.categories;
        state.dimensions = action.payload.dimensions;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadProductProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(createNewProductProp.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        createNewProductProp.fulfilled,
        (state: ProductPropsState, action) => {
          const { modelName, result } = action.payload;
          (state[modelName as modelName] as ProductProp[]).push(result);
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(createNewProductProp.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteProductProp.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        deleteProductProp.fulfilled,
        (state: ProductPropsState, action) => {
          console.log(action.payload);
          const { modelName, id } = action.payload;
          state[modelName as modelName] = state[modelName as modelName].filter(
            (item: ProductProp) => item.id !== id
          );
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addCase(deleteProductProp.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { selectProps } = productPropsSlice.actions;

export const selectProductProps = (state: RootState) => state.productProps;

export default productPropsSlice.reducer;
