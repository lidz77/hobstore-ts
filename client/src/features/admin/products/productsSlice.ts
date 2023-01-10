import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../../app/store";
import ProductImagesDataService from "../../../services/products/productImages.services";
import ProductPropsDataService from "../../../services/products/productprops.services";
import ProductsDataService from "../../../services/products/products.services";
import { ProductProp } from "./productPropsSlice";

export const loadProductImages = createAsyncThunk(
  "products/loadProductImages",
  async (productId: number) => {
    if (productId === 0) {
      return;
    }
    const res = ProductPropsDataService.getByProductId("images", productId)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

// const uploadSingle = async (
//   files: FileList,
//   thunkApi: {
//     dispatch: AppDispatch;
//   }
// ) => {
//   let imgIdsArray: number[] = [];
//   for (let index = 0; index < files.length; index++) {
//     await ProductImagesDataService.uploadSingle(files[index], (e: any) => {
//       thunkApi.dispatch(
//         setProgressUpload({
//           idx: index,
//           percentage: Math.round((100 * e.loaded) / e.total),
//         })
//       );
//     })
//       .then((result) => {
//         imgIdsArray = [...imgIdsArray, result.data.id];
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   return Promise.all(imgIdsArray);
// };
const uploadSingle = async (
  files: FileList,
  thunkApi: {
    dispatch: AppDispatch;
  }
) => {
  // let imgIdsArray: number[] = [];
  let promises: Promise<number>[] = [];
  for (let index = 0; index < files.length; index++) {
    promises.push(
      ProductImagesDataService.uploadSingle(files[index], (e: any) => {
        thunkApi.dispatch(
          setProgressUpload({
            idx: index,
            percentage: Math.round((100 * e.loaded) / e.total),
          })
        );
      }).then((result) => {
        return result.data.id;
      })
    );
  }
  const imgIds = await Promise.all(promises);
  return imgIds;
};

export const uploadImages = createAsyncThunk<
  number[],
  FileList,
  {
    dispatch: AppDispatch;
  }
>("products/uploadImages", async (files, thunkApi): Promise<any> => {
  const res = await uploadSingle(files, thunkApi)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
});

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

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (id: number) => {
    const res = ProductsDataService.findById(id)
      .then((result) => {
        return {
          ...result.data,
          imagesInfo: [],
          imagesIdsArray: result.data.productImages.map(
            (item: { id: number }) => item.id
          ),
        };
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

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (ids: number[] | number) => {
    const res = ProductsDataService.delete(ids)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

//Product object is the only thing to interact with server

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
  imagesIdsArray: number[];
  isLoadingDetails: boolean;
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
  imagesIdsArray: [],
  isLoadingDetails: false,
});

export interface ProductsState {
  productDetails: Product;
  productsList: Product[];
  selectedProducts: number[];
  imagesList: [];
  imagesInfo: { percentage: number; name: string }[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: ProductsState = {
  productDetails: emptyProduct(),
  productsList: [],
  selectedProducts: [],
  imagesList: [],
  imagesInfo: [],
  isLoading: false,
  hasError: false,
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setImagesInfo: (
      state,
      action: PayloadAction<{ percentage: number; name: string }>
    ) => {
      // console.log(action.payload);
      state.imagesInfo.push(action.payload);
    },
    setProgressUpload: (
      state,
      action: PayloadAction<{ idx: number; percentage: number }>
    ) => {
      const payload = action.payload;
      state.imagesInfo[payload.idx].percentage = payload.percentage;
    },
    removeImageInfo: (state, action: PayloadAction<number>) => {
      state.imagesInfo = state.imagesInfo.filter((item, index) => {
        return index !== action.payload;
      });
    },
    selectProp: (
      state,
      action: PayloadAction<{
        propName: string;
        productProp: ProductProp | null;
      }>
    ) => {
      const { propName, productProp } = action.payload;
      state.productDetails = {
        ...state.productDetails,
        [propName]: productProp,
      };
    },
    changeInput: (
      state,
      action: PayloadAction<{ field: string; value: string | number | boolean }>
    ) => {
      const { field, value } = action.payload;
      state.productDetails = {
        ...state.productDetails,
        [field]: value,
      };
    },
    clearDetails: (state) => {
      state.productDetails = emptyProduct();
      state.imagesList = [];
      state.imagesInfo = [];
    },
    setProductsId: (state, action: PayloadAction<number>) => {
      state.selectedProducts.includes(action.payload)
        ? (state.selectedProducts = state.selectedProducts.filter(
            (item) => item !== action.payload
          ))
        : state.selectedProducts.push(action.payload);
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
      })
      .addCase(editProduct.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.productDetails = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productsList.push(action.payload);
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productsList = state.productsList.filter(
          (item) => !action.payload.idArray.includes(item.id)
        );
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(uploadImages.pending, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.productDetails.imagesIdsArray = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(loadProductImages.pending, (state, action) => {
        state.productDetails.isLoadingDetails = true;
      })
      .addCase(loadProductImages.fulfilled, (state, action) => {
        state.imagesList = action.payload;
        state.productDetails.isLoadingDetails = false;
      })
      .addCase(loadProductImages.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const {
  selectProp,
  changeInput,
  clearDetails,
  setProductsId,
  setImagesInfo,
  setProgressUpload,
  removeImageInfo,
} = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products;
export default productsSlice.reducer;
