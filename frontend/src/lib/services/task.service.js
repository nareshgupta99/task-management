import api from "@/lib/axios";

export const TaskService = {
  
  getTasks: () => api.get("http://localhost:8080/api/task"),
  getAssignedTasks: () => api.get("http://localhost:8080/api/task/assigned"),
  createTask: (data) => api.post("/tasks", data),
  updateTaskStatus: (id, status) =>
    api.post(`http://localhost:8080/api/task/status/${id}`, { status }),
};
