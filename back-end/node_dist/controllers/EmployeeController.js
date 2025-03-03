"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async createEmployee(req, res) {
        try {
            const employee = await this.employeeService.createEmployee(req.body);
            res.status(201).json(employee);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllEmployees(req, res) {
        try {
            const employees = await this.employeeService.getAllEmployees();
            res.json(employees);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getEmployeeById(req, res) {
        try {
            const employee = await this.employeeService.getEmployeeById(req.params.id);
            if (employee) {
                res.json(employee);
            }
            else {
                res.status(404).json({ error: "Employee not found" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateEmployee(req, res) {
        try {
            const employee = await this.employeeService.updateEmployee(req.params.id, req.body);
            if (employee) {
                res.json(employee);
            }
            else {
                res.status(404).json({ error: "Employee not found" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteEmployee(req, res) {
        try {
            const success = await this.employeeService.deleteEmployee(req.params.id);
            if (success) {
                res.json({ message: "Employee deleted successfully" });
            }
            else {
                res.status(404).json({ error: "Employee not found" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.EmployeeController = EmployeeController;
