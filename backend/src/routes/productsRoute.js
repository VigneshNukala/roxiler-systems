const express = require("express");
const productRouter = express.Router();
const { store } = require("../db/store.js");

productRouter.get("/transactions/:month", async (req, res) => {
  try {
    let { search = "", page = 1, limit = 10 } = req.query;
    let { month } = req.params;

    page = Math.max(1, parseInt(page, 10) || 1);
    limit = Math.max(1, parseInt(limit, 10) || 10);
    const offset = (page - 1) * limit;

    month = parseInt(month, 10);
    if (!month || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid month" });
    }

    const result = await store.getProductsData(search, month);

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    const totalPages = Math.ceil(result.total / limit);

    return res.status(200).json({
      status: "success",
      data: result.data.slice(offset, offset + limit),
      metadata: {
        current_page: page,
        total_pages: totalPages,
        total_count: result.total,
        current_limit: limit,
        filter_month: month,
      },
      error: null,
    });
  } catch (error) {
    console.error("Error in /products route:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch products",
      error,
    });
  }
});

productRouter.get("/pie-chart/:month", async (req, res) => {
  try {
    let { month } = req.params;

    // Ensure month is a valid number (1-12)
    month = parseInt(month, 10);
    if (!month || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid month" });
    }

    // Fetch category-wise product counts
    const result = await store.getCategoryCounts(month);

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    return res.status(200).json({
      status: "success",
      data: result.data,
      filter_month: month,
      error: null,
    });
  } catch (error) {
    console.error("Error in /products/pie-chart route:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch category counts",
      error,
    });
  }
});

productRouter.get("/bar-chart/:month", async (req, res) => {
  try {
    let { month } = req.params;

    month = parseInt(month, 10);
    if (!month || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid month" });
    }

    const result = await store.getPriceRangeCounts(month);

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    return res.status(200).json({
      status: "success",
      data: result.data,
      filter_month: month,
      error: null,
    });
  } catch (error) {
    console.error("Error in /products/bar-chart route:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch price range data",
      error,
    });
  }
});

productRouter.get("/combined/:month", async (req, res) => {
  try {
    let { month } = req.params;
    let { search = "", page = 1, limit = 10 } = req.query;

    month = parseInt(month, 10);
    if (!month || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid month" });
    }

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    const [productsData, pieChartData, barChartData] = await Promise.all([
      store.getProductsData(search, page, limit, month),
      store.getCategoryCounts(month),
      store.getPriceRangeCounts(month),
    ]);

    if (
      productsData.status === "error" ||
      pieChartData.status === "error" ||
      barChartData.status === "error"
    ) {
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch combined data",
        errors: {
          productsDataError: productsData.error || null,
          pieChartDataError: pieChartData.error || null,
          barChartDataError: barChartData.error || null,
        },
      });
    }

    return res.status(200).json({
      status: "success",
      filter_month: month,
      products: productsData,
      pie_chart: pieChartData.data,
      bar_chart: barChartData.data,
    });
  } catch (error) {
    console.error("Error in /products/combined route:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch combined product data",
      error,
    });
  }
});

productRouter.get("/statistics/:month", async (req, res) => {
  const { month } = req.params;
  console.log("Requested Month:", month);

  try {
    const parsedMonth = parseInt(month, 10);

    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      return res.status(400).json({
        status: "error",
        error: "Invalid month. Please provide a number between 1 and 12.",
        data: null,
      });
    }

    const products = await store.getProductsByMonth(parsedMonth);
    console.log("Got products from DB:", products);

    let sale = 0;
    let sold = 0;
    let total = 0;

    products.forEach((product) => {
      if (product.sold) {
        sold += 1;
        sale += product.price;
      }
      total += 1;
    });

    const stats = {
      totalSale: sale,
      totalSold: sold,
      totalUnsold: total - sold,
    };

    console.log("Stats:", stats);

    return res.status(200).json({
      status: "success",
      data: stats,
      error: null,
    });
  } catch (error) {
    console.error("Route Error:", error);
    return res.status(500).json({
      status: "error",
      error: "Internal server error",
      data: null,
    });
  }
});

module.exports = productRouter;
