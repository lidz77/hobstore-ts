import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ProductToolbar from "../../../components/ProductToolbar";
import ProductDetails from "./ProductDetails";
import {
  loadProductProperties,
  ProductProp,
  selectProductProps,
} from "./productPropsSlice";

import ProductsList from "./ProductsList";
import {
  changeInput,
  createProduct,
  loadProducts,
  Product,
  selectProducts,
  selectProp,
} from "./productsSlice";

interface ProductsProps {}

const Products = ({}: ProductsProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(true);
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

  const handleSelectProductProp = (
    propName: string,
    productProp: ProductProp
  ) => {
    dispatch(selectProp({ propName, productProp }));
  };
  const handleInputChange = (field: string, text: string | number) => {
    dispatch(changeInput({ field, text }));
  };
  const handleSubmit = (product: Product) => {
    if (product.id === 0) {
      dispatch(createProduct(product));
    } else {
    }
  };

  return (
    <main>
      <ProductToolbar handleDialog={handleDialog} />
      <ProductsList
        productsIsLoading={products.isLoading}
        productsList={products.productsList}
      />
      <ProductDetails
        productDetails={products.productDetails}
        handleInputChange={handleInputChange}
        handleSelectProductProp={handleSelectProductProp}
        handleLoadProductProps={handleLoadProductProps}
        productsIsLoading={products.isLoading}
        openDialog={openDialog}
        productProperties={productProperties}
      />
    </main>
  );
};

export default Products;
