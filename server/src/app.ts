import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// app.use("/api/auth" , authRoutes)

app.get("/", (_, res) => {
  res.send("Server is running 🚀");
});


export default app;
