import { Request, Response } from "express";
import { EmployeeService } from "../services/EmployeeService";

export class EmployeeController {
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  async createEmployee(req: Request, res: Response) {
    try {
      const employee = await this.employeeService.createEmployee(req.body);
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllEmployees(req: Request, res: Response) {
    try {
      const employees = await this.employeeService.getAllEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEmployeeById(req: Request, res: Response) {
    try {
      const employee = await this.employeeService.getEmployeeById(
        req.params.id
      );
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateEmployee(req: Request, res: Response) {
    try {
      const employee = await this.employeeService.updateEmployee(
        req.params.id,
        req.body
      );
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    try {
      const success = await this.employeeService.deleteEmployee(req.params.id);
      if (success) {
        res.json({ message: "Employee deleted successfully" });
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
