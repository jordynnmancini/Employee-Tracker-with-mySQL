DROP DATABASE IF EXISTS employeesDB; 
CREATE database employeesDB; 

USE employeesDB; 

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)
); 

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10,2) NOT NULL, 
    department_id INT NOT NULL,
    PRIMARY KEY (id),
	FOREIGN KEY (department_id) REFERENCES department(id)
); 

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_ID INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

SELECT * FROM department; 

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 70000.00, 1),
("Salesperson", 50000.00, 1),
("Lead Engineer", 110000.00, 2), 
("Software Engineer", 95000.00, 2), 
("Account Manager", 65000.00, 1), 
("Accountant", 100000.00, 3), 
("Legal Team Lead", 90000.00, 4); 

SELECT * FROM role; 



INSERT INTO department(id, name)
VALUES
(001, "Sales"),
(002, "Marketing"),
(003, "Engineering"),
(004, "Finance"),
(005, "Legal");

INSERT INTO role(id, title, salary, department_id)
VALUES
(41, "Salesperson", 40000, 001),
(42, "Sales Intern", 20000, 001),
(51, "Marketing Manager", 50000, 002),
(52, "Digital Marketing Specialist", 45000, 002),
(61, "Senior Engineer", 80000, 003),
(62, "Engineering Intern", 25000, 003),
(71, "Senior Accountant", 55000, 004),
(72, "Accountant", 55000, 004),
(81, "Senior Corporate Counsel", 110000, 005),
(82, "Laywer", 45000, 005);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES
(4408, "Lynette", "Price", 41, NULL),
(4482, "Hugh", "Bailey", 42, 4408),
(4807, "Dolores", "Schneider", 42, 4408),
(5028, "Jeanette", "Watkins", 51, NULL),
(5049, "Mike", "Web", 52, 5028),
(5132, "Eileen", "Jensen", 52, 5028),
(5389, "Lela", "Freeman", 52, 5028),
(6378, "Oliver", "Higgins", 61, NULL),
(6198, "Casey", "Cooper", 62, 6378),
(6755, "Alan", "Zimmerman", 62, 6378),
(7815, "Kim", "McCormick", 71, NULL),
(7729, "Antonio", "Page", 72, 7815),
(7238, "Hannah", "Porter", 72, 7815),
(8632, "Bradley", "McLaughlin", 81, NULL),
(8311, "Nancy", "Cobb", 82, 8632),
(8949, "Seth", "Long", 82, 8632);