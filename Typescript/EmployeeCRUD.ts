import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface Employee {
    id: number;
    name: string;
    department: string;
    salary: number;
}

class EmployeeService {

    private employees: Employee[] = [];

    // CREATE
    addEmployee(employee: Employee): void {
        this.employees.push(employee);
        console.log("\nEmployee added successfully!");
    }

    // READ
    viewEmployees(): void {

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
    updateEmployee(id: number): void {

        const employee = this.employees.find(
            emp => emp.id === id
        );

        if (!employee) {
            console.log("\nEmployee not found!");
            return;
        }

        rl.question("Enter new name: ", (name: string) => {

            rl.question("Enter new department: ", (department: string) => {

                rl.question("Enter new salary: ", (salaryInput: string) => {

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
    deleteEmployee(id: number): void {

        const index = this.employees.findIndex(
            emp => emp.id === id
        );

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
function menu(): void {

    console.log("\n============================");
    console.log("     EMPLOYEE CRUD SYSTEM");
    console.log("============================");
    console.log("1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");
    console.log("============================");

    rl.question("Enter your choice: ", (choice: string) => {

        switch (choice) {

            case "1":
                addEmployeeInput();
                break;

            case "2":
                service.viewEmployees();
                menu();
                break;

            case "3":
                rl.question("Enter employee ID to update: ", (id: string) => {
                    service.updateEmployee(Number(id));
                });
                break;

            case "4":
                rl.question("Enter employee ID to delete: ", (id: string) => {

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
function addEmployeeInput(): void {

    rl.question("Enter employee ID: ", (id: string) => {

        rl.question("Enter employee name: ", (name: string) => {

            rl.question("Enter department: ", (department: string) => {

                rl.question("Enter salary: ", (salary: string) => {

                    const employee: Employee = {
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