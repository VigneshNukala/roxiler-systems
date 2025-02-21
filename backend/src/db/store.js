require("dotenv").config();
const axios = require("axios");
const mysql = require("mysql2/promise");

class ProductStore {
  constructor() {
    this.db = null;
  }

  // Create database connection
  async connect() {
    if (!this.db) {
      this.db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 21049,
        ssl: {
          rejectUnauthorized: false,
        },
      });
      console.log("Database connected successfully!");
    }
  }

  // Create Products Table
  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS products (
          id INT PRIMARY KEY,
          title VARCHAR(255),
          price DECIMAL(10,2),
          description TEXT,
          category VARCHAR(100),
          image VARCHAR(500),
          sold BOOLEAN,
          date_of_sale DATE
      )
    `;

    try {
      const connection = await this.db.getConnection();
      await connection.execute(sql);
      connection.release();
      console.log("Table checked/created successfully!");
    } catch (error) {
      console.error("Error creating table:", error);
    }
  }

  // Fetch data from API and insert into DB
  async fetchAndStoreData() {
    try {
      const response = await axios.get(process.env.API_URL);
      const transactions = response.data;

      const sql = `
        INSERT INTO products (id, title, price, description, category, image, sold, date_of_sale)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE title=VALUES(title), price=VALUES(price),
                                description=VALUES(description), category=VALUES(category),
                                image=VALUES(image), sold=VALUES(sold), date_of_sale=VALUES(date_of_sale)
      `;

      const connection = await this.db.getConnection();
      for (const transaction of transactions) {
        await connection.execute(sql, [
          transaction.id,
          transaction.title,
          transaction.price,
          transaction.description,
          transaction.category,
          transaction.image,
          transaction.sold,
          transaction.dateOfSale,
        ]);
      }
      connection.release();
      console.log("Database initialized with seed data!");
    } catch (error) {
      console.error("Error fetching or inserting data:", error);
    }
  }

  // Fetch prodcuts data from DB
  async getProductsData(search, month) {
    let query = `SELECT * FROM products WHERE MONTH(date_of_sale) = ?`;
    let params = [month];

    if (search) {
      query += ` AND (title LIKE ? OR category LIKE ? OR description LIKE ?)`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    try {
      const connection = await this.db.getConnection();

      const countQuery = `SELECT COUNT(*) as total FROM (${query}) as subquery`;
      const [[{ total }]] = await connection.execute(countQuery, params);

      const [rows] = await connection.execute(query, params);
      connection.release();

      return { status: "success", data: rows, total };
    } catch (error) {
      console.error("Error fetching products:", error);
      return { status: "error", message: "Failed to retrieve products", error };
    }
  }

  // Fetch price range count from DB
  async getPriceRangeCounts(month) {
    const query = `
      SELECT
        CASE 
          WHEN price BETWEEN 0 AND 100 THEN '0-100'
          WHEN price BETWEEN 101 AND 200 THEN '101-200'
          WHEN price BETWEEN 201 AND 300 THEN '201-300'
          WHEN price BETWEEN 301 AND 400 THEN '301-400'
          WHEN price BETWEEN 401 AND 500 THEN '401-500'
          WHEN price BETWEEN 501 AND 600 THEN '501-600'
          WHEN price BETWEEN 601 AND 700 THEN '601-700'
          WHEN price BETWEEN 701 AND 800 THEN '701-800'
          WHEN price BETWEEN 801 AND 900 THEN '801-900'
          ELSE '901-above'
        END AS price_range,
        COUNT(*) AS item_count
      FROM products
      WHERE MONTH(date_of_sale) = ?
      GROUP BY price_range
      ORDER BY MIN(price);
    `;

    try {
      const connection = await this.db.getConnection();
      const [rows] = await connection.execute(query, [month]);
      connection.release();

      return { status: "success", data: rows };
    } catch (error) {
      console.error("Error fetching price range counts:", error);
      return {
        status: "error",
        message: "Failed to retrieve price range data",
        error,
      };
    }
  }

  // Fetch category count from DB
  async getCategoryCounts(month) {
    const query = `
      SELECT category, COUNT(*) as item_count
      FROM products
      WHERE MONTH(date_of_sale) = ?
      GROUP BY category
      ORDER BY item_count DESC;
    `;

    try {
      const connection = await this.db.getConnection();
      const [rows] = await connection.execute(query, [month]);
      connection.release();

      return { status: "success", data: rows };
    } catch (error) {
      console.error("Error fetching category counts:", error);
      return {
        status: "error",
        message: "Failed to retrieve category data",
        error,
      };
    }
  }

  // Fetch products data by month from DB
  async getProductsByMonth(month) {
    let query = `SELECT * FROM products WHERE MONTH(date_of_sale) = ?`;
    let connection;
    try {
      connection = await this.db.getConnection();
      const [rows] = await connection.execute(query, [month]);
      return rows;
    } catch (error) {
      console.error("Database Query Error:", error);
      throw new Error("Database query failed");
      s;
    } finally {
      if (connection) connection.release();
    }
  }

  // Close the database connection
  async close() {
    if (this.db) {
      await this.db.end();
      this.db = null;
      console.log("✅ Database connection closed.");
    }
  }
}

const store = new ProductStore();

module.exports = { store };
