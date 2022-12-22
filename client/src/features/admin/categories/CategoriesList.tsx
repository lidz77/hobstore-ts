import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LoadingBackdrop from "../../../components/LoadingBackdrop";
import { Category } from "./categoriesSlice";

interface CategoriesListProps {
  categoriesIsLoading: boolean;
  visibleCategories: Category[];
  handleSelectItem: (id: number) => void;
  handleEditCategory: (id: number) => void;
  handleDeleteCategory: (ids: number[]) => void;
}

const CategoriesList = ({
  categoriesIsLoading,
  visibleCategories,
  handleSelectItem,
  handleEditCategory,
  handleDeleteCategory,
}: CategoriesListProps) => {
  const columns = ["Select", "ID", "Name", "Description", "Actions"];
  return (
    <Box sx={{ fg: 1 }}>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        {categoriesIsLoading ? (
          <LoadingBackdrop />
        ) : (
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((item, index) => {
                    return <TableCell key={index}>{item}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleCategories &&
                  visibleCategories.map((item: Category, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell padding="checkbox">
                          <Checkbox onClick={() => handleSelectItem(item.id)} />
                        </TableCell>
                        <TableCell padding="checkbox">{item.id}</TableCell>
                        <TableCell padding="checkbox">{item.name}</TableCell>
                        <TableCell padding="checkbox">
                          {item.description}
                        </TableCell>
                        <TableCell padding="checkbox">
                          <ButtonGroup>
                            <Button
                              color="secondary"
                              onClick={() => handleEditCategory(item.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDeleteCategory([item.id])}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default CategoriesList;
