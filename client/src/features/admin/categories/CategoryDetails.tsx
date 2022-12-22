import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Dialog,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputLabel,
} from "@mui/material";
import { Close, Done } from "@mui/icons-material/";
import React, { FormEvent, useEffect, useState } from "react";
import LoadingBackdrop from "../../../components/LoadingBackdrop";

interface CategoryDetailsProps {
  open: boolean;
  handleDialog: () => void;
  categoryDetails: any;
  isLoading: boolean;
  handleUpdateCategory: (id: number, data: object) => void;
  handleCreateCategory: (data: object) => void;
}

const CategoryDetails = ({
  open,
  handleDialog,
  categoryDetails,
  isLoading,
  handleUpdateCategory,
  handleCreateCategory,
}: CategoryDetailsProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setName(categoryDetails.name || "");
    setDescription(categoryDetails.description || "");
  }, [categoryDetails]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    categoryDetails.id
      ? handleUpdateCategory(categoryDetails.id, {
          name: name,
          description: description,
        })
      : handleCreateCategory({ name: name, description: description });
    handleDialog();
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm">
      {isLoading ? (
        <LoadingBackdrop />
      ) : (
        <Box>
          <DialogTitle
            sx={{ m: 0, p: 2, padding: (theme) => theme.spacing(2) }}
          >
            Edit or add goes there{" "}
            <IconButton
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              onClick={() => handleDialog()}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <Box
            component="form"
            id="category-details"
            sx={{ flexFlow: 1 }}
            onSubmit={handleSubmit}
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="category-name">Title {""}</InputLabel>
              <Input
                id="category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="category-description">
                Description {""}
              </InputLabel>
              <Input
                id="category-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                type="submit"
                label="Done"
                icon={<Done />}
              />
              <BottomNavigationAction
                label="Cancel"
                icon={<Close />}
                onClick={handleDialog}
              />
            </BottomNavigation>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default CategoryDetails;
