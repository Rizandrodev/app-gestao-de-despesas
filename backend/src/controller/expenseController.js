import ExpenseModel from "../models/expenseModels.js";

class ExpenseController {
  static async getAllExpenses(req, res) {
    try {
      const expenses = await ExpenseModel.getAll();
      if (expenses.length === 0) {
        return res.status(200).json({ message: "Sem despesas" });
      }
      res.status(200).json(expenses);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
      res.status(500).json({ error: "Erro ao buscar despesas" });
    }
  }

  static async getExpensesByDateRange(req, res) {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ error: "Os parâmetros startDate e endDate são obrigatórios" });
      } 
      const expenses = await ExpenseModel.getByDateRange(startDate, endDate);
      if (expenses.length === 0) {
        return res.status(200).json({ message: "Nenhuma despesa encontrada no intervalo" });
      }
      res.status(200).json(expenses);
    } catch (error) {
      console.error("Erro ao buscar despesas por data:", error);
      res.status(500).json({ error: "Erro ao buscar despesas por data" });
    }
  }

  static async addExpense(req, res) {
    try {
      const { description, amount, date } = req.body;
      if (!description || !amount) {
        return res.status(400).json({ error: "Campos description e amount são obrigatórios" });
      }
      const newExpense = await ExpenseModel.create({
        description,
        amount: parseFloat(amount), // Garantir que amount seja um número
        date: date || new Date().toISOString(),
      });
      res.status(201).json(newExpense);
    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
      res.status(500).json({ error: "Erro ao adicionar despesa" });
    }
  }

  static async deleteExpense(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "ID da despesa é obrigatório" });
      }
      await ExpenseModel.delete(id);
      res.status(200).json({ message: "Despesa removida com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
      res.status(500).json({ error: "Erro ao excluir despesa" });
    }
  }

  static async deleteAll(req, res) {
    try {
      await ExpenseModel.deleteAll();
      res.status(200).json({ message: "Todas as despesas foram deletadas" });
    } catch (error) {
      console.error("Erro ao excluir todas as despesas:", error);
      res.status(500).json({ error: "Erro ao excluir todas as despesas" });
    }
  }
}

export default ExpenseController;