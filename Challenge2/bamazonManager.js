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
          "Exit"
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
          viewProductsAddInventory();
          break;
  
        case "Add New Product":
          newProduct();
          break;
  
        case "Exit":
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
            productsArray.push("ID: " + res[i].item_id + "||" + "Item: " + res[i].product_name + "||" + "Department: " + res[i].department_name + "||" + "Size: " + res[i].size + "||" + "Price: $" + res[i].price + "||" + "Quantity: " + res[i].stock_quantity);
        }
        console.log(productsArray);
        console.log("-----------------------------------------------------------");
        runManager();
    })
};

function lowInventory() {
    var productsArray = [];
    connection.query("SELECT * FROM products WHERE stock_quantity < 3", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            productsArray.push("ID: " + res[i].item_id + "||" + "Item: " + res[i].product_name + "||" + "Department: " + res[i].department_name + "||" + "Size: " + res[i].size + "||" + "Price: $" + res[i].price + "||" + "Quantity: " + res[i].stock_quantity);
        }
        console.log(productsArray);
        console.log("-----------------------------------------------------------");
        runManager();
    })
};

function viewProductsAddInventory() {
    var productsArray = [];
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            productsArray.push("ID: " + res[i].item_id + "||" + "Item: " + res[i].product_name + "||" + "Department: " + res[i].department_name + "||" + "Size: " + res[i].size + "||" + "Price: $" + res[i].price + "||" + "Quantity: " + res[i].stock_quantity);
        }
        console.log(productsArray);
        console.log("-----------------------------------------------------------");
        customerQuery();
    })
};

function customerQuery() {
    inquirer
      .prompt([
        {
          name: "item_id",
          type: "input",
          message: "Input the item ID of the product you'd like to add quantity too.",
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
          message: "How many would you like to add",
          validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
        }
      ])
      .then(function (answer) {
        addInventory(answer.item_id, parseInt(answer.quantity));
      });
  };
  
  
function addInventory(id, quantity) {
    connection.query("SELECT * FROM products WHERE ?", [{ item_id: id }], function (err, results) {
        if (err) throw err;
        var dbQuantity = parseInt(results[0].stock_quantity);
        var newQuantity = dbQuantity + quantity;
        connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity }, { item_id: id }], function (error) {
            if (error) throw err;
            console.log("Your stock quantity has been updated.");
            console.log("-----------------------------------------------------------");
            runManager();
        }
        );
    });
};


function newProduct() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
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
            product_name: answer.product,
            size: answer.size,
            department_name: answer.department,
            price: answer.price || 0,
            stock_quantity: answer.quantity || 0
          },
          function(err) {
            if (err) throw err;
            console.log("Your product was created successfully!");
            console.log("-----------------------------------------------------------");
            runManager();
          }
        );
      });
  }