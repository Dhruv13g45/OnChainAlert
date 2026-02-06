import express from "express";
import dotenv from "dotenv";
import connectDB from "./Database/db.js";
import eventRoutes from "./routes/eventRoutes.routes.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import startIndexer from "./Indexer/indexer.js";

// Load environment variables
dotenv.config();

const app = express();

// Check env variables
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing in .env file");
  process.exit(1);
}

// Connect database
connectDB();
console.log("Starting Cyrene-style event indexer backend...");


// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database: "connected"
  });
});


// Event routes
app.use("/events", eventRoutes);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startIndexer();
});
