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

connection.connect(function(err) {
    if (err) throw err;
    runManager();
});

function runManager() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;
  
        case "View Low Inventory":
          lowInventory();
          break;
  
        case "Add to Inventory":
          addInventory();
          break;
  
        case "Add New Product":
          newProduct();
          break;
  
        case "exit":
          connection.end();
          break;
        }
      });
  }

function viewProducts() {
    var productsArray = [];
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            productsArray.push("ID: " + res[i].item_id + "||" + "Item: " + res[i].product_name + "||" + "Size: " + res[i].size + "||" + "Price: " + res[i].price + "||" + "Quantity: " + res[i].stock_quantity);
        }
        console.log(productsArray);
        runManager();
    })
};

function lowInventory() {
    var productsArray = [];
    connection.query("SELECT * FROM products WHERE stock_quantity < 3", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            productsArray.push("ID: " + res[i].item_id + "||" + "Item: " + res[i].product_name + "||" + "Size: " + res[i].size + "||" + "Price: " + res[i].price + "||" + "Quantity: " + res[i].stock_quantity);
        }
        console.log(productsArray);
        runManager();
    })
};