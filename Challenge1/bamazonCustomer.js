//first display all of the items available for sale
//include all ids, names, sizes, and prices

//prompt users with two mesages.
// ask them the ID of the product they want to buy
//ask how many units of the product they want to buy

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
          productsArray.push("ID: " + res[i].item_id + "||" + "Item: " + res[i].product_name + "||" + "Size: " + res[i].size + "||" + "Price: " + res[i].price);
      }
      console.log(productsArray);
    })
};


function customerQuery() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
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
        //console.log this entire function to reveal what information is produced and how to repurpose it.
        .then(function(answer) {
          // use this to gather information about quantity and set it to a variable to perform an operation.
          console.log(answer);
          // var chosenItem;
          // for (var i = 0; i < results.length; i++) {
          //   if (results[i].item_name === answer.choice) {
          //     chosenItem = results[i];
          //   }
          // }
  
          // if (chosenItem.highest_bid < parseInt(answer.bid)) {
          //   //need to update this if function to be if quantity avaiable > quanitity requested, then do this.
          //   connection.query(
          //       //need to use query to discover the new quantity and reset the value in the db
          //       //need to calcaulte total price.
          //     "UPDATE auctions SET ? WHERE ?",
          //     [
          //       {
          //         highest_bid: answer.bid
          //       },
          //       {
          //         id: chosenItem.id
          //       }
          //     ],
          //     function(error) {
          //       if (error) throw err;
          //       console.log("Thank you for your purchase! Your total was $: " totalprice variable);
          //       start();
          //     }
          //   );
          // }
          // else {
          //   console.log("Insufficient Quanity! Try again.");
          //   start();
          // }
        });
    });
  }