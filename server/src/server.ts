import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import authRoutes from "./routes/auth.routes"
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth" , authRoutes)

app.get("/", (_, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();