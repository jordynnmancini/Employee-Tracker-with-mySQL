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


INSERT INTO department(id, name)
VALUES
(001, "Sales"),
(002, "Engineering"),
(003, "Finance"),
(004, "Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 70000.00, 001),
("Salesperson", 50000.00, 001),
("Lead Engineer", 110000.00, 002), 
("Software Engineer", 95000.00, 002), 
("Account Manager", 65000.00, 001), 
("Accountant", 100000.00, 003), 
("Legal Team Lead", 90000.00, 004); 

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Lynette", "Price", 1, NULL),
("Hugh", "Bailey", 2, 1),
("Dolores", "Schneider", 2, 1),
("Jeanette", "Watkins", 3, NULL),
("Mike", "Web", 4, 4),
("Eileen", "Jensen", 4, 4),
("Lela", "Freeman", 4, 4),
("Oliver", "Higgins", 7, NULL),
("Casey", "Cooper", 5, 1),
("Alan", "Zimmerman", 5, 1),
("Kim", "McCormick", 6, NULL),
("Antonio", "Page", 4, 4),
("Hannah", "Porter", 2, 1),
("Bradley", "McLaughlin", 6, NULL),
("Nancy", "Cobb", 7, NULL),
("Seth", "Long", 6, NULL);
