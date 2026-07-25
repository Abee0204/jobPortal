import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js"
import jobRoutes from "./routes/job.routes.js"
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth" , authRoutes)
app.use("/api/jobs", jobRoutes);

app.get("/", (_, res) => {
  res.send("Server is running 🚀");
});


export default app;
