import http from "../../http-common";

class ProductsDataService {
  getByAttributes(filterObject: any): Promise<any> {
    return http.get("/products/client", { params: filterObject });
  }
  getAll(): Promise<any> {
    return http.get("/products");
  }
  create(data: object): Promise<any> {
    console.log(data);
    return http.post("/products/", data);
  }
  findById(id: number): Promise<any> {
    return http.get(`/products/${id}`);
  }
  update(id: number, data: object): Promise<any> {
    return http.put(`/products/${id}`, { id, data });
  }
  delete(ids: number[] | number): Promise<any> {
    return http.delete("/products/", { params: { idArray: ids } });
  }
}
export default new ProductsDataService();
