"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class EmployeeService {
    employees = [];
    // CREATE
    addEmployee(employee) {
        this.employees.push(employee);
        console.log("\nEmployee added successfully!");
    }
    // READ
    viewEmployees() {
        if (this.employees.length === 0) {
            console.log("\nNo employees found.");
            return;
        }
        console.log("\nEmployee Records:");
        this.employees.forEach((employee) => {
            console.log("----------------------------");
            console.log("ID:", employee.id);
            console.log("Name:", employee.name);
            console.log("Department:", employee.department);
            console.log("Salary:", employee.salary);
        });
    }
    // UPDATE
    updateEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (!employee) {
            console.log("\nEmployee not found!");
            return;
        }
        rl.question("Enter new name: ", (name) => {
            rl.question("Enter new department: ", (department) => {
                rl.question("Enter new salary: ", (salaryInput) => {
                    employee.name = name;
                    employee.department = department;
                    employee.salary = Number(salaryInput);
                    console.log("\nEmployee updated successfully!");
                    menu();
                });
            });
        });
    }
    // DELETE
    deleteEmployee(id) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index === -1) {
            console.log("\nEmployee not found!");
            return;
        }
        this.employees.splice(index, 1);
        console.log("\nEmployee deleted successfully!");
    }
}
const service = new EmployeeService();
// MENU
function menu() {
    console.log("\n============================");
    console.log("     EMPLOYEE CRUD SYSTEM");
    console.log("============================");
    console.log("1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");
    console.log("============================");
    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case "1":
                addEmployeeInput();
                break;
            case "2":
                service.viewEmployees();
                menu();
                break;
            case "3":
                rl.question("Enter employee ID to update: ", (id) => {
                    service.updateEmployee(Number(id));
                });
                break;
            case "4":
                rl.question("Enter employee ID to delete: ", (id) => {
                    service.deleteEmployee(Number(id));
                    menu();
                });
                break;
            case "5":
                console.log("\nThank you!");
                rl.close();
                break;
            default:
                console.log("\nInvalid choice!");
                menu();
        }
    });
}
// ADD EMPLOYEE INPUT
function addEmployeeInput() {
    rl.question("Enter employee ID: ", (id) => {
        rl.question("Enter employee name: ", (name) => {
            rl.question("Enter department: ", (department) => {
                rl.question("Enter salary: ", (salary) => {
                    const employee = {
                        id: Number(id),
                        name: name,
                        department: department,
                        salary: Number(salary)
                    };
                    service.addEmployee(employee);
                    menu();
                });
            });
        });
    });
}
// Start program
menu();
