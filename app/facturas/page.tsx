"use client";
//Pantalla de facturas

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TableList from "../components/TableList";
import { apiProveedores } from "../lib/api";

interface Factura {
  id?: number;
  proveedorId: number;
  subtotal: number;
  totalFactura?: number;
}

export default function FacturasPage() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [nuevaFactura, setNuevaFactura] = useState<Factura>({ proveedorId: 0, subtotal: 0 });
  const [proveedores, setProveedores] = useState<{ id: number; nombre: string }[]>([]);

  const fetchFacturas = () => apiProveedores.get("/facturas").then(res => setFacturas(res.data));
  const fetchProveedores = () => apiProveedores.get("/proveedores").then(res => setProveedores(res.data));

  useEffect(() => {
    fetchFacturas();
    fetchProveedores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiProveedores.post("/facturas", nuevaFactura);
      setNuevaFactura({ proveedorId: 0, subtotal: 0 });
      fetchFacturas();
    } catch (error) {
      console.error("Error creando factura:", error);
    }
  };

  return (
    <Layout>
      <h2>Facturas</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <select
          value={nuevaFactura.proveedorId}
          onChange={e => setNuevaFactura({ ...nuevaFactura, proveedorId: Number(e.target.value) })}
          required
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "white",
            color: "black",
            flex: "1 1 200px",
          }}
        >
          <option value={0}>Selecciona un proveedor</option>
          {proveedores.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Subtotal del pedido"
          value={nuevaFactura.subtotal}
          onChange={e => setNuevaFactura({ ...nuevaFactura, subtotal: Number(e.target.value) })}
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
          Agregar Pedido
        </button>
      </form>

      <TableList columns={facturas[0] ? Object.keys(facturas[0]) : []} data={facturas}/>
    </Layout>
  );
}