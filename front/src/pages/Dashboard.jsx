import { useEffect, useState, useCallback } from "react";
import { getDespesas, criarDespesa, deletarDespesa } from "../api/api.js";
import Navbar from "./navBar.jsx"; // Importe o novo componente

export default function Dashboard() {
  const [despesas, setDespesas] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [error, setError] = useState(null);

  const formatarDespesas = useCallback((data) =>
    data.map((despesa) => ({
      id: despesa.id,
      nome: despesa.description,
      valor: despesa.amount,
      date: despesa.date,
    })),
    []
  );

  // Carrega todas as despesas inicialmente
  useEffect(() => {
    const carregarDespesas = async () => {
      try {
        const data = await getDespesas();
        setDespesas(formatarDespesas(data));
      } catch (error) {
        setError("Erro ao carregar despesas. Tente novamente.");
        console.error("Erro ao carregar despesas:", error);
      }
    };
    carregarDespesas();
  }, [formatarDespesas]);

  const handleAdd = useCallback(async () => {
    if (!nome || !valor) {
      setError("Preencha todos os campos!");
      return;
    }

    const novaDespesa = { description: nome, amount: parseFloat(valor) };
    try {
      const response = await criarDespesa(novaDespesa);
      setDespesas((prev) => [
        ...prev,
        { id: response.id, nome, valor: parseFloat(valor), date: response.date },
      ]);
      setNome("");
      setValor("");
      setError(null);
    } catch (error) {
      setError("Erro ao adicionar despesa. Tente novamente.");
      console.error("Erro ao adicionar despesa:", error);
    }
  }, [nome, valor]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deletarDespesa(id);
      setDespesas((prev) => prev.filter((despesa) => despesa.id !== id));
      setError(null);
    } catch (error) {
      setError("Erro ao deletar despesa. Tente novamente.");
      console.error("Erro ao deletar despesa:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar setDespesas={setDespesas} setError={setError} formatarDespesas={formatarDespesas} />

      {/* Conteúdo principal */}
      <div className="flex flex-col items-center justify-center p-6">
        {/* Formulário para adicionar despesas */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-full max-w-md mb-6">
          <h2 className="text-xl font-semibold mb-3">Adicionar Despesa</h2>
          <input
            type="text"
            placeholder="Nome da despesa"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2 rounded w-full mb-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Valor (R$)"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="border p-2 rounded w-full mb-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white w-full py-2 rounded mt-3 hover:bg-green-600 transition duration-200"
          >
            ➕ Adicionar
          </button>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>

        {/* Lista de despesas */}
        <div className="w-full max-w-md">
          <ul className="bg-gray-800 text-white shadow-lg rounded-lg p-4">
            {despesas.length === 0 ? (
              <p className="text-center text-gray-400">Nenhuma despesa cadastrada.</p>
            ) : (
              despesas.map((despesa) => (
                <li
                  key={despesa.id}
                  className="flex justify-between items-center border-b border-gray-700 py-2 last:border-b-0"
                >
                  <span className="text-lg">
                    <span className="text-white">{despesa.nome}</span> -{" "}
                    <span className="font-semibold text-green-400">R$ {despesa.valor}</span>{" "}
                    <span className="text-gray-400 text-sm">
                      ({new Date(despesa.date).toLocaleDateString()})
                    </span>
                  </span>
                  <button
                    onClick={() => handleDelete(despesa.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    ❌
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}