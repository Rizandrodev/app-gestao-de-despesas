import ExpenseModel from "../models/expenseModels.js";

class ExpenseController {
  static async getAllExpenses(req, res) {
    try {
      const expenses = await ExpenseModel.getAll();
      if(expenses.length==[]){
        res.json({
          "message":"Sem despesas "
        });  
      }
      res.json(expenses);
    } catch (error) {
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
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar despesas por data" });
    }
  }


  static async addExpense(req, res) {
    try {
      const { description, amount, date } = req.body;
      if (!description || !amount) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes" });
      }

      const newExpense = await ExpenseModel.create({ description, amount, date: date || new Date().toISOString() });
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).json({ error: "Erro ao adicionar despesa" });
    }
  }

  static async deleteExpense(req, res) {
    try {
      const { id } = req.params;
      await ExpenseModel.delete(id);
      res.status(200).json({ message: "Despesa removida" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir despesa" });
    }
  }

  static async delete(req, res) {
    try {

      await ExpenseModel.deleteAll();
      res.status(200).json({ message: "Todas Despesas foram deletadas " });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir despesa" });
    }
  }
}

export default ExpenseController;
