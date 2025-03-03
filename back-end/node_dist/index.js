"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const Employee_1 = require("./entity/Employee");
const employeeRoutes_1 = require("./routes/employeeRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    url: "mongodb://localhost:27017/hr-app",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [Employee_1.Employee],
});
AppDataSource.initialize()
    .then(() => {
    // Initialize routes
    app.use("/api/employees", (0, employeeRoutes_1.createEmployeeRouter)(AppDataSource));
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => console.log("TypeORM connection error: ", error));
