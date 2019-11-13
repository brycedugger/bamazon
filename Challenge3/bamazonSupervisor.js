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
                case "View Product Sale by Department":
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

    var departmentArray = [];

    var query = "SELECT d.department_id as 'Department_ID', d.department_name as 'Department', d.over_head_costs as 'Over_Head_Costs',";
    query += "SUM(p.product_sales) as 'Product_Sales', SUM(p.product_sales) - d.over_head_costs as 'Total_Profit'";
    query += "FROM departments as d LEFT JOIN products AS p ON (d.department_name = p.department_name) GROUP BY d.department_id";

    connection.query(query
        , function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                departmentArray.push("ID: " + res[i].Department_ID + "||" + "Department: " + res[i].Department + "||" + "Over Head Costs: $"  + res[i].Over_Head_Costs + "||" + "Product Sales: $" + res[i].Product_Sales + "||" + "Total Profit: $" + res[i].Total_Profit);
            }
            console.log(departmentArray);
            runSupervisor();
        })
};