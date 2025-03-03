import { DataSource, MongoRepository, ObjectId } from "typeorm";
import { Employee } from "../entity/Employee";

export class EmployeeService {
  private employeeRepository: MongoRepository<Employee>;

  constructor(dataSource: DataSource) {
    this.employeeRepository = dataSource.getMongoRepository(Employee);
  }

  async createEmployee(employeeData: Partial<Employee>): Promise<Employee> {
    try {
      const employee = this.employeeRepository.create(employeeData);
      return await this.employeeRepository.save(employee);
    } catch (error: any) {
      throw new Error(`Error creating employee: ${error.message}`);
    }
  }

  async getAllEmployees(): Promise<Employee[]> {
    try {
      return await this.employeeRepository.find();
    } catch (error: any) {
      throw new Error(`Error fetching employees: ${error.message}`);
    }
  }

  async getEmployeeById(id: string): Promise<Employee | null> {
    try {
      return await this.employeeRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
    } catch (error: any) {
      throw new Error(`Error fetching employee: ${error.message}`);
    }
  }

  async updateEmployee(
    id: string,
    employeeData: Partial<Employee>
  ): Promise<Employee | null> {
    try {
      const result = await this.employeeRepository.updateOne(
        { _id: new ObjectId(id) },
        { $set: employeeData }
      );

      if (result.matchedCount === 0) {
        return null;
      }

      return await this.getEmployeeById(id);
    } catch (error: any) {
      throw new Error(`Error updating employee: ${error.message}`);
    }
  }

  async deleteEmployee(id: string): Promise<boolean> {
    try {
      const result = await this.employeeRepository.deleteOne({
        _id: new ObjectId(id),
      });
      return result.deletedCount > 0;
    } catch (error: any) {
      throw new Error(`Error deleting employee: ${error.message}`);
    }
  }

  // Additional business logic methods
  async getEmployeesByDepartment(department: string): Promise<Employee[]> {
    try {
      return await this.employeeRepository.find({
        where: { department },
      });
    } catch (error: any) {
      throw new Error(
        `Error fetching employees by department: ${error.message}`
      );
    }
  }

  async getEmployeesByJoiningDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Employee[]> {
    try {
      return await this.employeeRepository.find({
        where: {
          joiningDate: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      });
    } catch (error: any) {
      throw new Error(
        `Error fetching employees by date range: ${error.message}`
      );
    }
  }

  async getTotalSalaryByDepartment(department: string): Promise<number> {
    try {
      const employees = await this.getEmployeesByDepartment(department);
      return employees.reduce((total, emp) => total + emp.salary, 0);
    } catch (error: any) {
      throw new Error(`Error calculating total salary: ${error.message}`);
    }
  }
}
