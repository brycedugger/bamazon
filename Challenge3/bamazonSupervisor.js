var inquirer = require("inquirer");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "white9831442?",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    runSupervisor();
});

function runSupervisor() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewProductSales();
                    break;

                case "Create New Department":
                    supervisorQuery();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function supervisorQuery() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What is the department you would like to add?",
            },
            {
                name: "over_head_costs",
                type: "input",
                message: "What is the over head cost of this department?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    department_name: answer.department,
                    over_head_costs: answer.over_head_costs || 0
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created successfully!");
                    console.log("-----------------------------------------------------------");
                    runSupervisor();
                }
            );
        });
};


function viewProductSales() {
    // select from department -- id name and ohc
    // create allias for product sales and join from products and summation of all products where in department.
    // create allias for total profit to hard calculate within the alias
                // SELECT 10 AS my_num, my_num*5 AS another_number 
                // FROM table
};


SELECT
    orderNumber `Order no.`,
    SUM(priceEach * quantityOrdered) total
FROM
    orderDetails
GROUP BY
    `Order no.`
HAVING
    total > 60000;


select products.info and department info
where department_id = item_id?

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

SELECT members.`first_name` , members.`last_name` , movies.`title`
FROM members ,movies
WHERE movies.`id` = members.`movie_id`

SELECT departments.`department_id` , departments.`department_name`, departments.`over_head_costs`,  
FROM departments,products
WHERE departments.`department_name` = products.`department_name`

SELECT SUM(product_sales)
FROM products
WHERE departments.`department_name` = products.`department_name`;
