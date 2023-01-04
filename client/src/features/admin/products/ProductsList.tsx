import {
  Avatar,
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
import { Product } from "./productsSlice";

interface ProductsListProps {
  productsIsLoading: boolean;
  productsList: Product[];
  handleEditProduct: (id: number) => void;
  handleDeleteProduct: (ids: number[] | number) => void;
  handleSetProductsId: (id: number) => void;
}

const ProductsList = ({
  productsIsLoading,
  productsList,
  handleEditProduct,
  handleDeleteProduct,
  handleSetProductsId,
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
                        <Checkbox
                          onClick={() => handleSetProductsId(item.id)}
                        />
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>
                        {item.dimension && item.dimension.name}
                      </TableCell>
                      <TableCell>{item.brand && item.brand.name}</TableCell>
                      <TableCell>
                        {item.material && item.material.name}
                      </TableCell>
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
                          <Button
                            color="secondary"
                            onClick={() => handleEditProduct(item.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            color="error"
                            variant="outlined"
                            onClick={() => handleDeleteProduct(item.id)}
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

export default ProductsList;
