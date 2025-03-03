"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const typeorm_1 = require("typeorm");
const Employee_1 = require("../entity/Employee");
class EmployeeService {
    constructor(dataSource) {
        this.employeeRepository = dataSource.getMongoRepository(Employee_1.Employee);
    }
    async createEmployee(employeeData) {
        try {
            const employee = this.employeeRepository.create(employeeData);
            return await this.employeeRepository.save(employee);
        }
        catch (error) {
            throw new Error(`Error creating employee: ${error.message}`);
        }
    }
    async getAllEmployees() {
        try {
            return await this.employeeRepository.find();
        }
        catch (error) {
            throw new Error(`Error fetching employees: ${error.message}`);
        }
    }
    async getEmployeeById(id) {
        try {
            return await this.employeeRepository.findOne({
                where: { _id: new typeorm_1.ObjectId(id) },
            });
        }
        catch (error) {
            throw new Error(`Error fetching employee: ${error.message}`);
        }
    }
    async updateEmployee(id, employeeData) {
        try {
            const result = await this.employeeRepository.updateOne({ _id: new typeorm_1.ObjectId(id) }, { $set: employeeData });
            if (result.matchedCount === 0) {
                return null;
            }
            return await this.getEmployeeById(id);
        }
        catch (error) {
            throw new Error(`Error updating employee: ${error.message}`);
        }
    }
    async deleteEmployee(id) {
        try {
            const result = await this.employeeRepository.deleteOne({
                _id: new typeorm_1.ObjectId(id),
            });
            return result.deletedCount > 0;
        }
        catch (error) {
            throw new Error(`Error deleting employee: ${error.message}`);
        }
    }
    // Additional business logic methods
    async getEmployeesByDepartment(department) {
        try {
            return await this.employeeRepository.find({
                where: { department },
            });
        }
        catch (error) {
            throw new Error(`Error fetching employees by department: ${error.message}`);
        }
    }
    async getEmployeesByJoiningDateRange(startDate, endDate) {
        try {
            return await this.employeeRepository.find({
                where: {
                    joiningDate: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            });
        }
        catch (error) {
            throw new Error(`Error fetching employees by date range: ${error.message}`);
        }
    }
    async getTotalSalaryByDepartment(department) {
        try {
            const employees = await this.getEmployeesByDepartment(department);
            return employees.reduce((total, emp) => total + emp.salary, 0);
        }
        catch (error) {
            throw new Error(`Error calculating total salary: ${error.message}`);
        }
    }
}
exports.EmployeeService = EmployeeService;
