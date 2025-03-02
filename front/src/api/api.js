import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"; // Ajustei para 4000, conforme seu backend

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Buscar todas as despesas
export async function getDespesas() {
  const response = await api.get("/api/expenses");
  return response.data;
}

// Buscar despesas por intervalo de datas
export async function getDespesasPorData(startDate, endDate) {
  const response = await api.get("/api/expenses", {
    params: { startDate, endDate },
  });
  console.log("Resposta do filtro por data:", response.data); // Para debug
  return response.data;
}

// Criar uma nova despesa
export async function criarDespesa(despesa) {
  const response = await api.post("/api/expenses", despesa);
  console.log("Resposta de criarDespesa:", response.data); // Para debug
  return response.data;
}

// Deletar uma despesa por ID
export async function deletarDespesa(id) {
  await api.delete(`/api/expenses/${id}`);
}

// Deletar todas as despesas (se necessário)
export async function deletarTudo() {
  await api.delete("/api/expenses");
}