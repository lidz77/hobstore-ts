import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import CategoriesDataService from "../../../services/categories.services";

export const createCategories = createAsyncThunk(
  "categories/createCategories",
  async (data: object) => {
    const res = await CategoriesDataService.create(data)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

export const loadCategories = createAsyncThunk(
  "categories/loadCategories",
  async () => {
    const res = await CategoriesDataService.getAll()
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (ids: number[]) => {
    const res = await CategoriesDataService.delete(ids)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (newCategory: { id: number; data: object }) => {
    const res = await CategoriesDataService.update(
      newCategory.id,
      newCategory.data
    )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (id: number) => {
    const res = await CategoriesDataService.getById(id)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

export interface Category {
  id: number;
  name: string;
  description: string;
}

export const emptyCategory = (): Category => ({
  id: 0,
  name: "",
  description: "",
});

export interface CategoriesState {
  categoryDetails: Category;
  categoriesList: Category[];
  isLoading: boolean;
  hasError: boolean;
  searchTerm: string;
  selectedItems: number[];
}

const initialState: CategoriesState = {
  categoryDetails: emptyCategory(),
  categoriesList: [],
  isLoading: false,
  hasError: false,
  searchTerm: "",
  selectedItems: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    selectItem: (state, action: PayloadAction<number>) => {
      state.selectedItems.includes(action.payload)
        ? (state.selectedItems = state.selectedItems.filter(
            (item) => item !== action.payload
          ))
        : state.selectedItems.push(action.payload);
    },
    clearDetails: (state) => {
      state.categoryDetails = emptyCategory();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categoriesList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getCategoryById.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.categoryDetails = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(createCategories.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(createCategories.fulfilled, (state, action) => {
        state.categoriesList.push(action.payload);
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categoriesList = state.categoriesList.map((item: Category) =>
          item.id === action.payload.data.id
            ? (item = action.payload.data)
            : item
        );
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoriesList = state.categoriesList.filter(
          (item: Category) => !action.payload.idArray.includes(item.id)
        );
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { setSearchTerm, selectItem, clearDetails } =
  categoriesSlice.actions;
export const selectCategories = (state: RootState) => state.categories;
export const selectVisibleCategories = (state: RootState) => {
  return state.categories.categoriesList.filter((item: any) => {
    return item.name
      .toLowerCase()
      .includes(state.categories.searchTerm.toLowerCase());
  });
};
export default categoriesSlice.reducer;
