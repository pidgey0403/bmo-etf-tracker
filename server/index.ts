import express from "express";
import cors from "cors";
import { loadPrices } from "./src/data/priceStore";
import etfRoutes from "./src/routes/etf.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Load price data into memory before accepting requests
loadPrices();

app.use("/api/etf", etfRoutes);

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});