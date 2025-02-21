const express = require("express");
const { store } = require("../db/store.js");

const initializeRouter = express.Router();

initializeRouter.get("/", async (req, res) => {
  await createTable();
  await fetchAndStoreData();
  res.send("Database initialized successfully with seed data.");
});

module.exports = initializeRouter;
