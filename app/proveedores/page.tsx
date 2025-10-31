"use client";

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TableList from "../components/TableList";
import { apiProveedores } from "../lib/api";

interface Proveedor {
  id?: number;
  nombre: string;
  correo: string;
}

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [nuevoProveedor, setNuevoProveedor] = useState<Proveedor>({ nombre: "", correo: "" });

  const fetchProveedores = () => {
    apiProveedores.get("/proveedores").then(res => setProveedores(res.data));
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiProveedores.post("/proveedores", nuevoProveedor);
      setNuevoProveedor({ nombre: "", correo: "" });
      fetchProveedores();
    } catch (error) {
      console.error("Error creando proveedor:", error);
    }
  };

  return (
    <Layout>
      <h2>Proveedores</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={nuevoProveedor.nombre}
          onChange={e => setNuevoProveedor({ ...nuevoProveedor, nombre: e.target.value })}
          required
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "white",
            color: "black",
            flex: "1 1 200px",
          }}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={nuevoProveedor.correo}
          onChange={e => setNuevoProveedor({ ...nuevoProveedor, correo: e.target.value })}
          required
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "white",
            color: "black",
            flex: "1 1 200px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: "12px",
            border: "1px solid #ccc",
            backgroundColor: "white",
            color: "black",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Agregar Proveedor
        </button>
      </form>

      <TableList columns={proveedores[0] ? Object.keys(proveedores[0]) : []} data={proveedores}/>
    </Layout>
  );
}