//once the order is placed, if the store doesn't have
//enough product, say "Insufficient quantity!"

//otherwise, update the quantity in the database
//then show the total cost of their purchase

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
    displayItems();
    customerQuery();
});

function displayItems() {
  var productsArray = [];
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
          productsArray.push("ID: " + res[i].item_id + "||" + "Item: " + res[i].product_name + "||" + "Size: " + res[i].size + "||" + "Price: " + res[i].price + "||" + "Quantity: " + res[i].stock_quantity);
      }
      console.log(productsArray);
      return productsArray;
    })
    return productsArray;
};

function customerQuery(productsArray) {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "item_id",
            type: "input",
            message: "Input the item ID of the product you'd like to purchase."
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
          }
        ])
        .then(function(answer) {
          var chosenItem;
          for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answer.item_id) {
              chosenItem = res[i];
            }
          }
          console.log("answer:" + answer);
          
  
          if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
            var newQuantity = parseInt(chosenItem.stock_quantity) - parseInt(answer.stock_quantity);
            // var totalPrice = parseInt(chosenItem.quantity) * res[i].price;
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newQuantity
                },
              ],
              function(error) {
                if (error) throw err;
                console.log("Thank you for your purchase!")
                // console.log("Thank you for your purchase! Your total was $: " + totalPrice);
              }
            );
          }
          else {
            console.log("Insufficient Quanity! Try again.");
          }
        });
    });
  }