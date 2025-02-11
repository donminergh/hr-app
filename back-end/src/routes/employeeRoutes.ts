import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { EmployeeService } from "../services/EmployeeService";
import { DataSource } from "typeorm";

export const createEmployeeRouter = (dataSource: DataSource) => {
  const router = Router();
  const employeeService = new EmployeeService(dataSource);
  const employeeController = new EmployeeController(employeeService);

  router.post("/", (req, res) => employeeController.createEmployee(req, res));
  router.get("/", (req, res) => employeeController.getAllEmployees(req, res));
  router.get("/:id", (req, res) =>
    employeeController.getEmployeeById(req, res)
  );
  router.put("/:id", (req, res) => employeeController.updateEmployee(req, res));
  router.delete("/:id", (req, res) =>
    employeeController.deleteEmployee(req, res)
  );

  return router;
};
