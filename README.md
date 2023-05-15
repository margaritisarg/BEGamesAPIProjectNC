# GamesMarsnC API
Welcome to the GamesMarsnC API, a project built with Express, MVC architecture, Jest, Supertest, and JavaScript. This API provides users with information about game reviews through robust endpoints.

## Hosted Site
Visit the hosted site here (may take a moment to load).

## Getting Started
### Clone the Repository
To clone the repository, simply click on the blue "clone" button on GitHub and copy the HTTPS link. Then, in your IDE's terminal, enter the command "git clone" followed by the copied link.

### Install Dependencies and Dev Dependencies
To install dependencies and dev dependencies, enter the command "npm install" in your terminal. The dependencies and dev dependencies will be automatically placed in their respective sections in the package.json file.

## Dependencies
cors: ^2.8.5

dotenv: ^16.0.0

express: ^4.18.2

pg: ^8.7.3

supertest: ^6.3.3

## Development Dependencies
husky: ^8.0.2

jest: ^27.5.1

jest-extended: ^2.0.0

pg-format: ^1.0.4

Create .env Files
To connect to the two DBs locally, you will need to create two files: .env.test and .env.development, which should be placed in the root directory. In each of these files, specify which PGDATABASE can connect to which. You can find the names of the DBs by looking into the db/setup.sql file. An example of the development file will look like this: PGDATABASE=shop_records, and for the test file: PGDATABASE=shop_records_test.

## Seed Local Data
To seed local data, enter the command "npm run setup-dbs" in your terminal and hit enter. Then, enter the command "npm run seed" and hit enter again.

## Running Tests
To run all tests in the "test" file, enter the command "npm t" in your terminal. To run tests for a specific file, run "npm t ./test/.test.js" followed by the file name.

## Minimum Requirements
Node version: v19.6.0
PostgreSQL version: 14.7
