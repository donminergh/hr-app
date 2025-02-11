import { ObjectId } from "mongodb";

export interface Employee {
  id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  joiningDate: Date;
  salary: number;
}

export type EmployeeFormData = Omit<Employee, "id">;
