DROP DATABASE IF EXISTS bamazonDB;

CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (

    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    size VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT default 0,
    product_sales DECIMAL(10,2) default 0,
    PRIMARY KEY (item_id)
    
);

CREATE TABLE departments (

    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NULL,
    over_head_costs DECIMAL(10,2) NULL,
    PRIMARY KEY (department_id)
);

SELECT * FROM products;

SELECT * FROM departments;