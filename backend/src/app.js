import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";
import ExpenseModel from "./models/expenseModels.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

// Criar tabela ao iniciar o servidor
ExpenseModel.createTable().then(() => console.log("Tabela criada/verificada"));

export default app;
