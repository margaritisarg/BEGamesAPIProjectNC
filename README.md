## Link to hosted site (may be a little slow): https://gamesmarsncapi.onrender.com/api 

# Summary of project:

This is an API project using express, MVC architecture, jest, supertests and JS to create robust endpoints which give the user information regarding the game's reviews. 

# How to create the env files:

In order to connect to the two DBs locallay, you will need to create two files, one called '.env.test' and another called '.env.development' - they should be in the root directory. In each of these files, you can then specify which PGDATABASE can connect to which. You can find the names of the DBs by looking into the db/setup.sql file. An example of the development file will look like is 'PGDATABASE=shop_records' and for the test file 'PGDATABASE=shop_records_test'.

# How to clone:

Click on the blue clone button on Github and copy the HTTPS, then in your IDE's terminal, type "git clone <paste here>" and hit enter.

  How to install dependencies and dev dependencies:
## Dependencies
- cors: ^2.8.5
- dotenv: ^16.0.0
- express: ^4.18.2
- pg: ^8.7.3
- supertest: ^6.3.3

## Development Dependencies
- husky: ^8.0.2
- jest: ^27.5.1
- jest-extended: ^2.0.0
- pg-format: ^1.0.4

Enter the command "npm install <dependencies name>" and hit enter. Repeat for each. Dependencies and dev dependencies should be automatically placed into their correct object in the json file. 

# How to seed local data:
  
Enter the command "npm run setup-dbs" and hit enter. Then enter the command "npm run seed" and hit enter again.


# How to run tests:
  
The commend in the terminal "npm t" will run all the tests in the "__test__" file. To speciify a c file to run tests on only, run "npm t ./__test__/<fileName>.test.js"


Minium Node version:
v19.6.0

Minium PostgreSQL version:
14.7
