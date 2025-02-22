require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { store } = require("./db/store.js");
const productRouter = require("./routes/productsRoute.js");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE", 
  credentials: true, 
}));
// Start the server
const startServer = async () => {
  try {
    const initialize = async () => {
      await store.connect();
      await store.createTable();
      await store.fetchAndStoreData();
    };
    await initialize();

    app.use("/products", productRouter);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server", error);
  }
};

startServer();
