import { SignOutButton } from "@clerk/clerk-react";
import { useState, useCallback } from "react";
import { getDespesas, getDespesasPorData } from "../api/api.js";

export default function Navbar({ setDespesas, setError, formatarDespesas }) {
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  // Função para filtrar despesas por data
  const handleFilterByDate = useCallback(async () => {
    if (!dataInicial || !dataFinal) {
      setError("Selecione as datas inicial e final!");
      return;
    }

    try {
      const data = await getDespesasPorData(dataInicial, dataFinal);
      setDespesas(formatarDespesas(data));
      setError(null);
    } catch (error) {
      setError("Erro ao filtrar despesas. Tente novamente.");
      console.error("Erro ao filtrar despesas:", error);
    }
  }, [dataInicial, dataFinal, setDespesas, setError, formatarDespesas]);

  // Função para resetar o filtro e mostrar todas as despesas
  const handleResetFilter = useCallback(async () => {
    try {
      const data = await getDespesas();
      setDespesas(formatarDespesas(data));
      setDataInicial("");
      setDataFinal("");
      setError(null);
    } catch (error) {
      setError("Erro ao carregar despesas. Tente novamente.");
      console.error("Erro ao resetar filtro:", error);
    }
  }, [setDespesas, setError, formatarDespesas]);

  return (
    <nav className="bg-gray-800 w-full p-4 shadow-lg flex items-center justify-between">
      {/* Título */}
      <h1 className="text-2xl font-bold text-white">💸 Minhas Despesas</h1>

      {/* Filtro por datas */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <input
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
            className="border p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
            className="border p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFilterByDate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            🔍
          </button>
          <button
            onClick={handleResetFilter}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
          >
            🔄
          </button>
        </div>

        {/* Botão de sair */}
        <SignOutButton>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            🚪 Sair
          </button>
        </SignOutButton>
      </div>
    </nav>
  );
}