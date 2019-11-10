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
            productsArray.push("ID: " + res[i].item_id + "||" + "Item: " + res[i].product_name + "||" + "Department: " + res[i].department_name + "||" + "Size: " + res[i].size + "||" + "Price: " + res[i].price + "||" + "Quantity: " + res[i].stock_quantity);
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
            productsArray.push("ID: " + res[i].item_id + "||" + "Item: " + res[i].product_name + "||" + "Department: " + res[i].department_name + "||" + "Size: " + res[i].size + "||" + "Price: " + res[i].price + "||" + "Quantity: " + res[i].stock_quantity);
        }
        console.log(productsArray);
        runManager();
    })
};


function newProduct() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
          {
              name: "id",
              type: "input",
              message: "What do you want to set the new product's ID value?",
              validate: function (value) {
                  if (isNaN(value) === false) {
                      return true;
                  }
                  return false;
              }
          },
          {
              name: "product",
              type: "input",
              message: "What's the name of the product?"
          },
          {
              name: "size",
              type: "input",
              message: "What's the size of the product?"
          },
          {
              name: "department",
              type: "input",
              message: "What department is the product a part of?"
          },
          {
              name: "price",
              type: "input",
              message: "What is the price of the product?",
              validate: function (value) {
                  if (isNaN(value) === false) {
                      return true;
                  }
                  return false;
              }
          },
          {
              name: "quantity",
              type: "input",
              message: "How much of this product is for sale?",
              validate: function (value) {
                  if (isNaN(value) === false) {
                      return true;
                  }
                  return false;
              }
          }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            item_id: answer.id,
            product_name: answer.product,
            size: answer.size,
            department_name: answer.department,
            price: answer.price || 0,
            stock_quantity: answer.quantity || 0
          },
          function(err) {
            if (err) throw err;
            console.log("Your product was created successfully!");
            runManager();
          }
        );
      });
  }