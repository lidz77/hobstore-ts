import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import categoriesReducer from "../features/admin/categories/categoriesSlice";
import productsReducer from "../features/admin/products/productsSlice";
import productPropsReducer from "../features/admin/products/productPropsSlice";
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    productProps: productPropsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
