import http from "../http-common";

class CategoriesDataService {
  getAll(): Promise<any> {
    return http.get("/categories/");
  }
  getById(id: number): Promise<any> {
    return http.get(`/categories/${id}`);
  }
  create(data: object): Promise<any> {
    return http.post("/categories/add", data);
  }
  delete(idArray: number[]): Promise<any> {
    return http.delete("/categories/", { params: { idArray: idArray } });
  }
  update(id: number, data: object): Promise<any> {
    return http.put(`/categories/${id}`, { id, data });
  }
}

export default new CategoriesDataService();
