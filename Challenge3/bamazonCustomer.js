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
        "Purchase a Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Purchase a Product":
        displayItems();
        break;

      case "Exit":
        connection.end();
        break;
      }
    });
}

function displayItems() {
  var productsArray = [];
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      productsArray.push("ID: " + res[i].item_id + "||" + "Item: " + res[i].product_name + "||" + "Size: " + res[i].size + "||" + "Price: $" + res[i].price);
    }
    console.log(productsArray);
    customerQuery();
  })
};

function customerQuery() {
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "Input the item ID of the product you'd like to purchase.",
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
        message: "How many would you like to purchase?",
        validate: function (value) {
          if (isNaN(value) === false) {
              return true;
          }
          return false;
      }
      }
    ])
    .then(function (answer) {
      checkStockQuantity(answer.item_id, parseInt(answer.quantity));
    });
};


function checkStockQuantity(id, quantity) {
  connection.query("SELECT * FROM products WHERE ?", [{ item_id: id }], function (err, results) {
    if (err) throw err;
    var dbQuantity = parseInt(results[0].stock_quantity);
    if (dbQuantity > quantity) {
      var newQuantity = dbQuantity - quantity;
      var totalPrice = quantity * parseFloat(results[0].price);
      connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQuantity},{ item_id: id }], function (error) {
          if (error) throw err;
          console.log("Thank you for your purchase! Your total was $: " + totalPrice);
          console.log("-----------------------------------------------------------");
          productSales(id, totalPrice);
          runManager();
        }
      );
    }
    else {
      console.log("Insufficient Quanity! Try again.");
      console.log("-----------------------------------------------------------");
      runManager();
    }
  });
};

function productSales(id, totalPrice) {
    connection.query("SELECT * FROM products WHERE ?", [{ item_id: id }], function (err, results) {
        if (err) throw err;
        var dbSales = parseInt(results[0].product_sales);
        var productSales = dbSales + totalPrice;
        connection.query("UPDATE products SET ? WHERE ?", [{ product_sales: productSales }, { item_id: id }], function (error) {
            if (error) throw err;
        }
        );
    });
};