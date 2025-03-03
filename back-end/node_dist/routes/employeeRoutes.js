"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeRouter = void 0;
const express_1 = require("express");
const EmployeeController_1 = require("../controllers/EmployeeController");
const EmployeeServices_1 = require("../services/EmployeeServices");
const createEmployeeRouter = (dataSource) => {
    const router = (0, express_1.Router)();
    const employeeService = new EmployeeServices_1.EmployeeService(dataSource);
    const employeeController = new EmployeeController_1.EmployeeController(employeeService);
    router.post("/", (req, res) => employeeController.createEmployee(req, res));
    router.get("/", (req, res) => employeeController.getAllEmployees(req, res));
    router.get("/:id", (req, res) => employeeController.getEmployeeById(req, res));
    router.put("/:id", (req, res) => employeeController.updateEmployee(req, res));
    router.delete("/:id", (req, res) => employeeController.deleteEmployee(req, res));
    return router;
};
exports.createEmployeeRouter = createEmployeeRouter;
