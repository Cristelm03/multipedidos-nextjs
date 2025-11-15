"use client";
//MENU

import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import CardMetric from "./components/CardMetric";
import { apiClientes, apiProveedores } from "./lib/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface Pedido {
  id: number;
  total: number;
  [key: string]: any;
}

export default function Home() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [facturas, setFacturas] = useState<any[]>([]);

  useEffect(() => {
    apiClientes.get("/clientes").then(res => setClientes(res.data));
    apiClientes.get("/pedidos").then(res => setPedidos(res.data));
    apiProveedores.get("/proveedores").then(res => setProveedores(res.data));
    apiProveedores.get("/facturas").then(res => setFacturas(res.data));
  }, []);

  const ventasMensuales = pedidos.map((p, i) => ({ name: `Pedido ${i+1}`, total: p.total }));

  return (
    <Layout>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <CardMetric title="Clientes" value={clientes.length} />
        <CardMetric title="Pedidos" value={pedidos.length} />
        <CardMetric title="Proveedores" value={proveedores.length} />
        <CardMetric title="Facturas" value={facturas.length} />
      </div>

      <h3 style={{ marginTop: 32 }}>Ventas Pedidos</h3>
      <LineChart width={700} height={300} data={ventasMensuales}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </Layout>
  );
}