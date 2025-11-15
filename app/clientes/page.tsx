"use client";
//Pantalla de clientes

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TableList from "../components/TableList";
import { apiClientes } from "../lib/api";

interface Cliente {
  id?: number;
  nombre: string;
  correo: string;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nuevoCliente, setNuevoCliente] = useState<Cliente>({ nombre: "", correo: "" });

  const fetchClientes = () => {
    apiClientes.get("/clientes").then(res => setClientes(res.data));
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClientes.post("/clientes", nuevoCliente);
      setNuevoCliente({ nombre: "", correo: "" });
      fetchClientes();
    } catch (error) {
      console.error("Error creando cliente:", error);
    }
  };

  return (
    <Layout>
      <h2>Clientes</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={nuevoCliente.nombre}
          onChange={e => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
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
          value={nuevoCliente.correo}
          onChange={e => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })}
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
          Agregar Cliente
        </button>
      </form>

      <TableList columns={clientes[0] ? Object.keys(clientes[0]) : []} data={clientes} />
    </Layout>
  );
}