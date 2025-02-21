require("dotenv").config();
const express = require("express");
const app = express();
const { store } = require("./db/store.js");
const initializeRouter = require("./routes/initialize.js");
const productRouter = require("./routes/productsRoute.js");
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
