## connecting to the two DBs locally

In order to connect to the two DBs locallay, you will need to create two files, one called '.env.test' and another called '.env.development' - they should be in the root directory. In each of these files, you can then specify which PGDATABASE can connect to which. You can find the names of the DBs by looking into the db/setup.sql file. An example of the development file will look like is 'PGDATABASE=shop_records' and for the test file 'PGDATABASE=shop_records_test'.

