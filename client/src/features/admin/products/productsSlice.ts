import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../app/store";
import ProductsDataService from "../../../services/products/products.services";
import ProductDetails from "./ProductDetails";
import { ProductProp } from "./productPropsSlice";

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async () => {
    const res = ProductsDataService.getAll()
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: Product) => {
    const res = ProductsDataService.create(product)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product) => {
    const res = ProductsDataService.update(product.id, product)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(Error);
      });
    return res;
  }
);

export interface Product {
  id: number;
  title: string;
  description: string;
  available: boolean;
  color: string;
  price: number;
  dimension: { id: number; name: string };
  brand: { id: number; name: string };
  material: { id: number; name: string };
  category: { id: number; name: string };
}

const emptyProduct = (): Product => ({
  id: 0,
  title: "",
  description: "",
  available: false,
  color: "#9c27b0",
  price: 0,
  dimension: { id: 0, name: "" },
  brand: { id: 0, name: "" },
  material: { id: 0, name: "" },
  category: { id: 0, name: "" },
});

export interface ProductsState {
  productDetails: Product;
  productsList: Product[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: ProductsState = {
  productDetails: emptyProduct(),
  productsList: [],
  isLoading: false,
  hasError: false,
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectProp: (
      state,
      action: PayloadAction<{ propName: string; productProp: ProductProp }>
    ) => {
      const { propName, productProp } = action.payload;
      state.productDetails = {
        ...state.productDetails,
        [propName]: productProp,
      };
    },
    changeInput: (
      state,
      action: PayloadAction<{ field: string; text: string | number }>
    ) => {
      const { field, text } = action.payload;
      state.productDetails = {
        ...state.productDetails,
        [field]: text,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.productsList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { selectProp, changeInput } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products;
export default productsSlice.reducer;
