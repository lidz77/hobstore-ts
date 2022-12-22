import React from "react";
import { Box, IconButton, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Search, SearchIconWrapper, StyleInputBase } from "../styles/Toolbar";

interface CategoryToolbarProps {
  handleSearchTerm: (text: string) => void;
  handleDialog: () => void;
  handleDeleteCategory: (items: number[]) => void;
  selectedItems: number[];
}

const CategoryToolbar = ({
  handleSearchTerm,
  handleDeleteCategory,
  handleDialog,
  selectedItems,
}: CategoryToolbarProps) => {
  return (
    <Box>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="Add new category"
            color="inherit"
            onClick={() => {
              handleDialog();
            }}
          >
            <PostAddIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="Delete category"
            color="inherit"
            onClick={() => handleDeleteCategory(selectedItems)}
            disabled={selectedItems.length === 0 ? true : false}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyleInputBase
            placeholder="Title..."
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => handleSearchTerm(e.target.value)}
          />
        </Search>
      </Toolbar>
    </Box>
  );
};
CategoryToolbar.propTypes = {};

export default CategoryToolbar;
