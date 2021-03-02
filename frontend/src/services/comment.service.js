import http from "../http-common";

class CommentDataService {
  getAll() {
    return http.get("/comment");
  }

  get(id) {
    return http.get(`/comment/${id}`);
  }

  create(data) {
    return http.post("/comment", data);
  }

  update(id, data) {
    return http.put(`/comment/${id}`, data);
  }

  delete(id) {
    return http.delete(`/comment/${id}`);
  }
}

export default new CommentDataService();