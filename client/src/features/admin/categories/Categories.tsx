import React, { useEffect, useState } from "react";
import {
  clearDetails,
  createCategories,
  deleteCategory,
  getCategoryById,
  loadCategories,
  selectCategories,
  selectVisibleCategories,
  setSearchTerm,
  updateCategory,
} from "./categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Box } from "@mui/material";
import CategoryToolbar from "../../../components/CategoryToolbar";
import CategoriesList from "./CategoriesList";
import CategoryDetails from "./CategoryDetails";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const visibleCategories = useAppSelector(selectVisibleCategories);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const handleDialog = () => {
    openDialog ? dispatch(clearDetails()) : setOpenDialog(true);
    setOpenDialog(!openDialog);
  };

  const handleSearchTerm = (text: string) => {
    dispatch(setSearchTerm(text));
  };

  const handleDeleteCategory = (ids: number[]) => {
    dispatch(deleteCategory(ids));
  };

  const handleSelectItem = (id: number) => {
    selectedItems.includes(id)
      ? setSelectedItems(selectedItems.filter((item) => item !== id))
      : setSelectedItems([...selectedItems, id]);
  };

  const handleEditCategory = (id: number) => {
    dispatch(getCategoryById(id));
    setOpenDialog(true);
  };

  const handleCreateCategory = (data: object) => {
    dispatch(createCategories(data));
  };

  const handleUpdateCategory = (id: number, data: object) => {
    dispatch(updateCategory({ id, data }));
  };

  return (
    <main>
      <Box>
        <CategoryToolbar
          handleSearchTerm={handleSearchTerm}
          handleDeleteCategory={handleDeleteCategory}
          handleDialog={handleDialog}
          selectedItems={selectedItems}
        />
      </Box>
      <CategoriesList
        handleDeleteCategory={handleDeleteCategory}
        categoriesIsLoading={categories.isLoading}
        visibleCategories={visibleCategories}
        handleSelectItem={handleSelectItem}
        handleEditCategory={handleEditCategory}
      />
      <CategoryDetails
        categoryDetails={categories.categoryDetails}
        handleDialog={handleDialog}
        open={openDialog}
        isLoading={categories.isLoading}
        handleUpdateCategory={handleUpdateCategory}
        handleCreateCategory={handleCreateCategory}
      />
    </main>
  );
};

export default Categories;
