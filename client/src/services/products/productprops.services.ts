import http from "../../http-common";

class ProductPropsDataService {
  getByProductId(propName: string, productId: number): Promise<any> {
    return http.get(`/products/${propName}/${productId}`);
  }
  getAll(): Promise<any> {
    return http.get(`/products/props`);
  }
  delete(propName: string, id: number): Promise<any> {
    return http.delete(`/products/${propName}/${id}`);
  }
  update(propName: string, id: number, data: object): Promise<any> {
    return http.put(`/products/${propName}/${id}`, data);
  }
  create(propName: string, data: object): Promise<any> {
    return http.post(`/products/${propName}`, data);
  }
}

export default new ProductPropsDataService();
