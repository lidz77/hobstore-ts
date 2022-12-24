import { CheckBox } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import LoadingBackdrop from "../../../components/LoadingBackdrop";
import { Product } from "./productsSlice";

interface ProductsListProps {
  productsIsLoading: boolean;
  productsList: Product[];
}

const ProductsList = ({
  productsIsLoading,
  productsList,
}: ProductsListProps) => {
  const columns = [
    "Select",
    "Name",
    "Dimension",
    "Brand",
    "Material",
    "Color",
    "Price",
    "Available",
    "Actions",
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {productsIsLoading ? (
          <LoadingBackdrop />
        ) : (
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((item: string, index) => {
                    return <TableCell key={index}>{item}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {productsList.map((item: Product, index: number) => {
                  return (
                    <TableRow hover role="checkbox" key={index}>
                      <TableCell padding="checkbox">
                        <CheckBox />
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.dimension.name}</TableCell>
                      <TableCell>{item.brand.name}</TableCell>
                      <TableCell>{item.material.name}</TableCell>
                      <TableCell>
                        <Avatar
                          sx={{ bgcolor: item.color, width: 30, height: 30 }}
                        >
                          {""}
                        </Avatar>
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        {item.available ? "Available" : "Out of stock"}
                      </TableCell>
                      <TableCell>
                        <ButtonGroup>
                          <Button color="secondary">Edit</Button>
                          <Button color="error" variant="outlined">
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

export default ProductsList;
