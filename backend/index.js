// server.js
import express from 'express';
import cors  from 'cors';
import bodyParser  from'body-parser';
import connectDB  from './config/db.js';
import recipeRoutes  from'./routes/recipeRoutes.js';
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api/recipes', recipeRoutes);

app.get("/api", (req, res) => {
  res.send("hello world");
});
const startServer = async () => {
    try {
      await connectDB(); // Wait for the database to connect
      const port = process.env.port || 4000 
      // Start the server only if the database connection is successful
      app.listen(port, () => {
        console.log(`server is running on port ${port}`);
      });
    } catch (error) {
      process.exit(1); // Exit the process if the database connection fails
    }
  };
  
  // Start the process
  startServer();
