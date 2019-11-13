BAMAZON

Bamazon is a knock off Amazon store that we will be using as a customer, a manager, and the supervisor of Bamazon.

Bamazon, to this project, is a command line application that lets the user view information about their product database and view, create, add, or modify products, and departments in the data base from the application. 

Depending on who is using the application, it will change the options avaialable to the user. A customer can vire products for sale and purchase a product. This will update the stock_quanity of a product in the database. A manager can view produts for sale with more information than a customer, view low inventory items, add more product to the inventory of our database, and add a new product to the database. A supervisor will have a spevialized window. Not only will the application allow them to see things like over head costs, product sales, and total profit by department, they will be able to add a new department as well.

Usage: 

Download or clone the repository.

Run
    npm install

Set up MySQL database locally.

Run the sql file located the Challenge folder you wish to use.

Navigate to each .js file in the challenge folders and update the connection string/password.

Open your terminal and run 

    node bamazonCustomer.js

    node bamazonManager.js

    node bamazonSupervisor

Example Output:

BAMAZON CUSTOMER:

![photo1](screenshots/1-1.JPG)

Figure 1: Main menu.

![photo1](/screenshots/1-2.JPG)

Figure 2: Purchase a product successfully.

![photo1](screenshots/1-3.jpg)

Figure 3: Purchase a product unsucessfully.

![photo1](/screenshots/1-4.jpg)

Figure 4: MySQL database.

BAMAZON MANAGER:

![photo1](/screenshots/2-2.jpg)

Figure 5: View products for sale. Larger menu than the customer's version.

![photo1](/screenshots/2-3.jpg)

Figure 6: View low inventory items or items with a quantity of less than 5.

![photo1](/screenshots/2-4.jpg)

Figure 7: Adding to the inventory.

![photo1](/screenshots/2-5.jpg)

Figure 8: Showing stock_quantity updated in the MySQL database.

![photo1](/screenshots/2-6.jpg)

Figure 9: Adding a new product to the database.

![photo1](/screenshots/2-7.jpg)

Figure 10: Showing new product in MySQL database.

![photo1](/screenshots/3-1.jpg)

Figure 11: View products for sale by department. Shown with different supervisor table displaying new options.

![photo1](/screenshots/3-2.JPG)

Figure 12: Showing how BamazonCustomer now has a product sales record available for the supervisor to keep track of profits.



Built With:

node.js
inquirer.js
mysql.js
SQL Database