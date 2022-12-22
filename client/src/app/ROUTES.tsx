const ROUTES: { [key: string]: () => string } = {
  homeRoute: () => "/",
  productsHome: () => "/products",
  categoriesHome: () => "/categories",
  aboutUsHome: () => "/aboutus",
  cookBooksHome: () => "/cookbooks",
  adminRoute: () => "/admin",
  categoriesAdmin: () => "/admin/categories",
  productsAdmin: () => "/admin/products",
  ordersAdmin: () => "/admin/orders",
};

export default ROUTES;
