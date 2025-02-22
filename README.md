# **Roxiler Systems** 

## **Introduction**  
This repository showcases the Sales Dashboard that displays statistical insights and a pie chart, bar chart visualization of product categories for a selected month. The application is built using React, Tailwind CSS, and Recharts, with data fetched from a backend API.

## **Deployment Link**
- **Frontend Link** : https://roxiler-systems-wine.vercel.app/
- **Backend Link** : https://roxiler-systems-c28u.onrender.com

## **Important Notes**
- The backend is deployed on Render, which provides a free-tier hosting solution for backend APIs. However, free-tier instances on Render spin down if they are inactive for a period of time.
- I have used Avien Console to manage the MySQL database, allowing easy query execution and data inspection. It helps in debugging and ensuring backend API data consistency.
- For local development, update the API URL in the .env file at the root directory:
  ```
  VITE_API_URL=https://localhost:3000/products
  ```

## **Prerequisites**

Ensure you have the following dependencies installed:

- **Node.js** (v16 or higher)
- **npm** (package manager)

## **Getting Started**  

Follow these steps to set up your development environment:

### **1. Clone the repository:**  

```
git clone https://github.com/VigneshNukala/roxiler-systems.git
cd roxiler-systems
```

### **2. Install dependencies for both frontend and backend:**

- **Backend** : Navigate to the backend/ directory and run npm install (or yarn install).
```bash
cd backend
npm install  # or yarn install
```

- **Frontend** : Navigate to the root directory and run npm install (or yarn install).
```bash
cd ..
npm install  # or yarn install
```

### **3. Start the servers (Two Different Terminals):**
- **Backend**
To start the backend server, navigate to the backend/ directory (if not already there) and run in a seperate terminal:
```bash
cd backend
npm run dev  # or yarn dev
```
- **Frontend**
To start the frontend server, navigate to the root directory (if not already there) and run in a seperate terminal:
```bash
cd ..
npm run dev  # or yarn start
```

### **3. Open the servers**
Once both servers are running, open your browser and visit:
```
http://localhost:5173/
```



