import http from "../../http-common";

class ProductPropsDataService {
  getByProductId(propName: string, productId: number): Promise<any> {
    return http.get(`/products/${propName}/${productId}`);
  }
  getAll(): Promise<any> {
    return http.get(`/products/props`);
  }
  //data should be keyword
  delete(data: { modelName: string; id: number }): Promise<any> {
    return http.delete(`/products/props`, { data });
  }
  update(propName: string, id: number, data: object): Promise<any> {
    return http.put(`/products/${propName}/${id}`, data);
  }
  create(data: object): Promise<any> {
    return http.post(`/products/props`, data);
  }
}

export default new ProductPropsDataService();
