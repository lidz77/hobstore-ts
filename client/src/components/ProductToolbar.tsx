import { Delete, PostAdd, Search as SearchIcon } from "@mui/icons-material";
import { Box, Toolbar, IconButton } from "@mui/material";
import React from "react";
import { Search, SearchIconWrapper, StyleInputBase } from "../styles/Toolbar";

interface ProductToolbarProps {
  handleDialog: () => void;
  handleDelete: (ids: number | number[]) => void;
  selectedProducts: number[];
}

const ProductToolbar = ({
  handleDialog,
  handleDelete,
  selectedProducts,
}: ProductToolbarProps) => {
  return (
    <Box>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="Add new product"
            color="inherit"
            onClick={handleDialog}
          >
            <PostAdd />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="Delete product"
            color="inherit"
            disabled={selectedProducts.length === 0 ? true : false}
            onClick={() => {
              handleDelete(selectedProducts);
            }}
          >
            <Delete />
          </IconButton>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyleInputBase
            placeholder="Title"
            inputProps={{ "aria-label": "Search" }}
          />
        </Search>
      </Toolbar>
    </Box>
  );
};

export default ProductToolbar;
