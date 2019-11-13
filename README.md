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





Built With:

node.js
inquirer.js
mysql.js
SQL Database