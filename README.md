# HR App

This project is a simple application to manage basic employee data.
- Back-end stack: Node with Express JS, Mongo DB,Type ORM, TypeScript
- Front-end stack: React, Tailwind CSS, TypeScript, NextJS

## Back-End
The back-end has a single controller (EmployeeController) which manages the creation, reading, update and deletion of employees using the EmployeeService.
The employee type is defind in Employee.ts, and finally the employee routes map controller actions to specific api endpoints.

## Front-End
The front-end relies on the directory based routing of next.js and so you will find the view components in the pages folder.
There's an employee type to match what's on the server, and there's formatDate util to handle date formatting. The create and edit forms use react hook form and deftly handle error checking.


