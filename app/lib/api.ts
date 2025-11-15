import axios from "axios";

export const apiClientes = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" }
}); 

export const apiProveedores = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: { "Content-Type": "application/json" }
});