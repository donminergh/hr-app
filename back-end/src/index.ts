import express from "express";
import { DataSource } from "typeorm";
import cors from "cors";
import { Employee } from "./entity/Employee";
import { createEmployeeRouter } from "./routes/employeeRoutes";

const app = express();
app.use(express.json());
app.use(cors());

const AppDataSource = new DataSource({
  type: "mongodb",
  url: "mongodb://localhost:27017/hr-app",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [Employee],
});

AppDataSource.initialize()
  .then(() => {
    // Initialize routes
    app.use("/api/employees", createEmployeeRouter(AppDataSource));

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
