import express from "express";
import ExpenseController from "../controller/expenseController.js";

const router = express.Router();

router.get("/", ExpenseController.getAllExpenses);
router.get("/filter", ExpenseController.getExpensesByDateRange);
router.post("/", ExpenseController.addExpense);
router.delete("/:id", ExpenseController.deleteExpense);
router.delete("/", ExpenseController.delete);

export default router;
