const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',

    password: '',
    database: 'employeesDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('you are connected');
    initialize();
});

const initialize = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees by Department', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'View All Roles', 'View All Departments', 'Add New Role', 'Add New Department'],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;

                case 'View All Employees by Department':
                    viewEmployeesByDept();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;

                case 'View All Roles':
                    viewAllRoles();
                    break;

                case 'View All Departments':
                    viewAllDepartments();
                    break;
                
                case 'Add New Role':
                    addNewRole();
                    break;

                 case 'Add New Department':
                    addNewDepartment();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const viewAllEmployees = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_ID FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id';

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`${res.length} employees found`);

        console.table(res);

        initialize();
    });
};

const viewEmployeesByDept = () => {
    const query = 'SELECT department.name, employee.first_name, employee.last_name, employee.id FROM department LEFT JOIN role ON department.id = role.department_id LEFT JOIN employee ON role.id = employee.role_id';

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);

        initialize();
    })
}

const addEmployee = () => {
    const query = 'SELECT role.title FROM role';

    connection.query(query, (err, res) => {
        let choices = res.map(function(res) {
            return res['title'];
        });

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newFirst',
                    message: 'What is the employees first name?',
                },
                {
                    type: 'input',
                    name: 'newLast',
                    message: 'What is this employees last name?',
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'What is this employees role?',
                    choices: choices,
                }
            ])
            .then((answers) => {
                connection.query('SELECT * from role', (err, res) => {
                    if (err) throw err;
                    const role = res.find(role => role.title === answers.newRole);

                    connection.query('INSERT INTO employee SET ?',
                        {
                            first_name: answers.newFirst,
                            last_name: answers.newLast,
                            role_id: role.id,
                        },
                        (err, res) => {
                            if (err) throw (err);
                            console.log(`${res.affectedRows} employee(s) inserted! \n`);

                            initialize();
                        }); 
                });
            });
    });
};

const removeEmployee = () => {
    const query = 'SELECT CONCAT(employee.first_name, " ", employee.last_name) AS fullName FROM employee';

    connection.query(query, (err, res) => {
        let choices = res.map(function (res) {
            return res['fullName'];
        });

        inquirer
            .prompt({
                type: 'list',
                name: 'delete',
                message: 'What employee would you like to remove?',
                choices: choices,
            })
            .then((answers) => {
                connection.query('SELECT id, first_name, last_name from employee', (err, res) => {
                    if (err) throw err;
                    let name = answers.delete.split(' ');

                    const employee = res.find(employee => employee.first_name === name[0] && employee.last_name === name[1]);

                    connection.query('DELETE FROM employee WHERE ?',
                        {
                            id: employee.id,
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log(`${res.affectedRows} employee(s) removed! \n`);

                            initialize();
                        });
                });
            });
    });

};

const updateEmployeeRole = () => {
    const query = 'SELECT CONCAT(employee.first_name, " ", employee.last_name) AS fullName FROM employee';

    connection.query(query, (err, res) => {
        let choices = res.map(function(res) {
            return res['fullName'];
        });

        connection.query('SELECT role.title FROM role', (err, res) => {
            let roles = res.map(function(res) {
                return res['title'];
            });

            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'What employee would you like to update?',
                        choices: choices,
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What do you want to change their role to?',
                        choices: roles,
                    },
                ])
                .then((answers) => {
                    connection.query('SELECT * FROM role', (err, res) => {
                        if (err) throw err;
                        const role = res.find(role => role.title === answers.role);

                        connection.query('SELECT * FROM employee', (err, res) => {
                            if (err) throw err;
                            let name = answers.employee.split(' ');
                            const employee = res.find(employee => employee.first_name === name[0] && employee.last_name === name[1]);

                            connection.query('UPDATE employee SET ? WHERE ?',
                                [
                                    {
                                        role_id: role.id,
                                    },
                                    {
                                        id: employee.id,
                                    },
                                ],
                                (err, res) => {
                                    if (err) throw err;
                                    console.log(`${res.affectedRows} employee(s) updated! \n`);

                                    initialize();
                                });
                        });

                    });
                });
        })
    });
};

const viewAllRoles = () => {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id', (err, res) => {
        if (err) throw err;
        console.log(`${res.length} roles found`);

        console.table(res);

        initialize();
    });
};

const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log(`${res.length} departments found`);

        console.table(res);

        initialize();
    });
};

const addNewRole = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        let choices = res.map(function(res) {
            return res['name'];
        });

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is this new role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is this roles salary?',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department is this role in?',
                    choices: choices, 
                }, 
            ])
            .then((answers) => {
                connection.query('SELECT * FROM department', (err, res) => {
                    if (err) throw err;
                    const department = res.find(department => department.name === answers.department);

                    connection.query('INSERT INTO role SET ?',
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: department.id, 
                    },
                    (err, res) => {
                        if (err) throw (err);
                        console.log(`${res.affectedRows} role(s) added! \n`);

                        initialize(); 
                    });
                });
            });
    });
};

const addNewDepartment = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'What is this new departments name?',
        })
        .then((answer) => {
            connection.query('INSERT INTO department SET ?',
            {
                name: answer.name,
            },
            (err, res) => {
                if (err) throw (err);
                console.log(`${res.affectedRows} department(s) added! \n`);
                
                initialize(); 
            });
        });
}; 