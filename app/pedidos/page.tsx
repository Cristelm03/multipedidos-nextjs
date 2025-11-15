"use client";
//Pantalla de pedidos

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TableList from "../components/TableList";
import { apiClientes } from "../lib/api";

interface Pedido {
  id?: number;
  clienteId: number;
  subtotal: number;
  total?: number;
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [nuevoPedido, setNuevoPedido] = useState<Pedido>({ clienteId: 0, subtotal: 0 });
  const [clientes, setClientes] = useState<{ id: number; nombre: string }[]>([]);

  const fetchPedidos = () => apiClientes.get("/pedidos").then(res => setPedidos(res.data));
  const fetchClientes = () => apiClientes.get("/clientes").then(res => setClientes(res.data));

  useEffect(() => {
    fetchPedidos();
    fetchClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClientes.post("/pedidos", nuevoPedido);
      setNuevoPedido({ clienteId: 0, subtotal: 0 });
      fetchPedidos();
    } catch (error) {
      console.error("Error creando pedido:", error);
    }
  };

  return (
    <Layout>
      <h2>Pedidos</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <select
          value={nuevoPedido.clienteId}
          onChange={e => setNuevoPedido({ ...nuevoPedido, clienteId: Number(e.target.value) })}
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
          <option value={0}>Selecciona un cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Subtotal del pedido"
          value={nuevoPedido.subtotal}
          onChange={e => setNuevoPedido({ ...nuevoPedido, subtotal: Number(e.target.value) })}
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

      <TableList columns={pedidos[0] ? Object.keys(pedidos[0]) : []} data={pedidos} />
    </Layout>
  );
}