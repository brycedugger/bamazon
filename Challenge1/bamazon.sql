DROP DATABASE IF EXISTS bamazonDB;

CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (

    item_id INT NOT NULL,
    product_name VARCHAR(100) NULL,
    size VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT default 0,
    PRIMARY KEY (item_id)
    
);

SELECT * FROM products;