import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ProductToolbar from "../../../components/ProductToolbar";
import ProductDetails from "./ProductDetails";
import {
  createNewProductProp,
  deleteProductProp,
  loadProductProperties,
  ProductProp,
  selectProductProps,
} from "./productPropsSlice";

import ProductsList from "./ProductsList";
import {
  changeInput,
  clearDetails,
  createProduct,
  deleteProduct,
  editProduct,
  loadProducts,
  selectProducts,
  selectProp,
  setProductsId,
  updateProduct,
} from "./productsSlice";

// interface ProductsProps {}

const Products = () =>
  // {}: ProductsProps
  {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const productProperties = useAppSelector(selectProductProps);

    useEffect(() => {
      dispatch(loadProducts());
      dispatch(loadProductProperties());
    }, [dispatch]);

    const handleDialog = () => {
      openDialog ? dispatch(clearDetails()) : dispatch(() => {});
      setOpenDialog(!openDialog);
    };

    const handleSetProductsId = (id: number) => {
      dispatch(setProductsId(id));
    };

    const handleEditProduct = (id: number) => {
      dispatch(editProduct(id));
      handleDialog();
    };

    const handleLoadProductProps = () => {
      dispatch(loadProductProperties());
    };

    const handleSelectProductProp = (
      propName: string,
      productProp: ProductProp | null
    ) => {
      dispatch(selectProp({ propName, productProp }));
    };

    const handleInputChange = (
      field: string,
      value: string | number | boolean
    ) => {
      dispatch(changeInput({ field, value }));
    };

    const handleAddNewProp = (modelName: string, name: string) => {
      dispatch(createNewProductProp({ modelName, name }));
    };

    const handleDeleteProp = (modelName: string, id: number) => {
      dispatch(deleteProductProp({ modelName, id }));
    };

    const handleSubmit = () => {
      if (products.productDetails.id === 0) {
        dispatch(createProduct(products.productDetails));
      } else {
        dispatch(updateProduct(products.productDetails));
      }
      handleDialog();
    };

    const handleDeleteProducts = (ids: number[] | number) => {
      dispatch(deleteProduct(ids));
    };

    return (
      <main>
        <ProductToolbar
          handleDialog={handleDialog}
          handleDelete={handleDeleteProducts}
          selectedProducts={products.selectedProducts}
        />
        <ProductsList
          handleSetProductsId={handleSetProductsId}
          handleDeleteProduct={handleDeleteProducts}
          productsIsLoading={products.isLoading}
          handleEditProduct={handleEditProduct}
          productsList={products.productsList}
        />
        <ProductDetails
          imagesHandlers={{
            imagesList: products.imagesList,
            imagesInfo: products.imagesInfo,
          }}
          handleSubmit={handleSubmit}
          handleDeleteProp={handleDeleteProp}
          handleAddNewProp={handleAddNewProp}
          productDetails={products.productDetails}
          handleInputChange={handleInputChange}
          handleSelectProductProp={handleSelectProductProp}
          handleLoadProductProps={handleLoadProductProps}
          productsIsLoading={products.isLoading}
          openDialog={openDialog}
          handleDialog={handleDialog}
          productProperties={productProperties}
        />
      </main>
    );
  };

export default Products;
