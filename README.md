# inventor-management-system-for-hospital
This is the Repo for Inventor Management System for Hospital

## Items
1. POST a new Item into inventory
2. GET See Current Stocks
3. GET Identify items whose stock is running low and need reordering.
4. GET Track which items are used most frequently in the hospital.
5. GET Show the current stock of an item by summing up all transactions (purchases, issues, etc.).
6. GET Show items that are about to expire.
7. GET: Show Items and Their Latest Transaction (Purchase/Issue)
8. GET: Track the Inventory Level Changes Over Time (For an Item)
9. GET: List Items with Supplier Details
10. GET: Average Time Between Purchases for Items
11. GET: Monthly Consumption Trend (For an Item)
12. GET: Items with Transaction History for a Specific Date Range
13. GET: Show Items and Their Transaction Status (Pending Orders)
14. GET: Items That Have Never Been Issued
15. GET: Items with Supplier Payment Status
16. GET: List All Items and Their Quantity issued from Each Department
17. GET: Item Returns to Supplier
18. GET Item location
19. GET out of stock item
20. GET items which are about to expire
21. GET item list of all expired
22. GET item list expired at range date
23. GET item from a location




## Categories
1. GET List all items that belong to a certain category 
2. GET All the Supplier of a category
3. POST Create new Category


## Suppliers
1. GET all the suppliers list
2. GET specific Item suppliers list
3. POST add new suppliers to list
4. PUT update status of suppliers to list


## Transactions Inward
1. GET all transaction from a user
2. GET all transaction from a department
3. GET all transaction from a transaction type
4. GET total transaction from range of date
5. GET all the transaction with mode of payment (Cash In Hand or Online Payment)
6. GET total payment of a mode
7. GET total payment of a mode range date


## Transactions outward
1. GET all the recent purchase items (specific the date range)
2. PUT update the return item
3. GET all the return items
4. GET all the purchase items of specific category
5. GET total amount issued by return items
6. GET total amount issued by purchase
7. GET all the transaction with mode of payment (Cash In Hand or Online Payment)
6. GET total payment of a mode
7. GET total payment of a mode range date



## Order Inward
1. GET all the purchase items
2. GET all the purchase items of specific category
3. GET all the unissued transactions
4. GET all the order which are not completed
5. GET all the order which are not completed range date
6. GET all the order which are completed range date
7. GET all the unissued transactions range date
8. GET all order issued by a user



## Order Outward
1. GET All the sales of range of date
2. GET all order issued by a user



## Department 
1. GET all the sales from a department
2. GET all the sales from a department with range date
3. GET all the return item issued from a department


## User
1. GET the details of all user
2. POST Create a new User
3. PUT Update the user
4. GET all the item purchased by a user
5. GET all the item issued bu a user



## Role
1. GET all the user of a Role
2. GET all the user of a permission
