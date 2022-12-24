import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ProductToolbar from "../../../components/ProductToolbar";
import ProductDetails from "./ProductDetails";
import { loadProductProperties, selectProductProps } from "./productPropsSlice";

import ProductsList from "./ProductsList";
import { loadProducts, selectProducts } from "./productsSlice";

interface ProductsProps {}

const Products = ({}: ProductsProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productProperties = useAppSelector(selectProductProps);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleLoadProductProps = () => {
    dispatch(loadProductProperties());
  };

  return (
    <main>
      <ProductToolbar handleDialog={handleDialog} />
      <ProductsList
        productsIsLoading={products.isLoading}
        productsList={products.productsList}
      />
      <ProductDetails
        handleLoadProductProps={handleLoadProductProps}
        productsIsLoading={products.isLoading}
        openDialog={openDialog}
        productProperties={productProperties}
      />
    </main>
  );
};

export default Products;
