import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true, // If your frontend needs to send cookies or authorization headers
  })
);

// Connect to the database
connectDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

// Use user routes
app.use("/api/auth", userRoutes);

app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
