# CNG-logistics-backend

The backend (Express and PostgreSQL) of the CNG SAS logistics project
(frontend: https://github.com/JoseAscuntar/CNG-logistics), an order management and audit system for this company.

## Environment Variables

There are three environment variables stored in `.env` (a file at the project root, which is not committed):

- `PORT`: it holds the value of the port the backend listens on. In the code, it defaults to 3000 if not set.
- `FRONTEND_URL`: it stores the URL of the frontend and allows CORS to work. For development it's using `http://localhost:5173` (without final slash), while for production, the host will set it to the Netlify URL.
- `DATABASE_URL`: it contains the host, role, port, database and password for the corresponding cng database (the format is `postgresql://<role>:<password>@<host>:<port>/<database>`). For development this will be a local database with no password; however, for production, the host will handle it.

## Prerequisites

- Node 24
- PostgreSQL

## Running locally

### Starting steps

1. Run `npm install` in the terminal.
2. Copy `.env.example` to `.env` (filled with your own values).

### Database Setup

3. Create a database in PostgreSQL
4. Create the tables by running the command `node ./db/populatedb.js postgresql://<role>:<password>@<host>:<port>/<database>`. This URL (the last argument) is the same as your DATABASE_URL.
5. (Optional) Seed the tables by running `node ./db/seeddb.js postgresql://<role>:<password>@<host>:<port>/<database>`. This URL (the last argument) is the same as your DATABASE_URL.

### Final steps

6. Run `npm run dev` in the terminal and everything should be seen on http://localhost:3000 (or the PORT you set).

## Endpoints

This backend has 9 paths (each with GET /, GET /:id, POST / and PUT /:id routes):

- /clients
- /contracts
- /legal-entities: Besides CNG, any legal name under which the contract is taking place.
- /presentations: Each product with each of its valid quantities (for example 40g of bread).
- /presentation-contracts: the selling price of each presentation for each contract.
- /products
- /suppliers
- /supplier-presentations: the buying price of each presentation from each supplier.
- /units: units of measurement (for example grams or milliliters)

There are no DELETE routes, since the values will be deactivated instead of deleted (in case they're needed again).

## Errors

The errors are mostly sent as a JSON with a single property called message (whose value is the error in Spanish).

If the error is a validation error, then the response is express-validator's array (the value of each property `"msg"` is also the error in Spanish).

### Status Codes

If an error occurs, this backend will return one of the following status codes:

- 400 (BAD_REQUEST): whenever a foreign ID is not found or when receiving invalid data (for example invalid JSON).
- 404 (NOT_FOUND): whenever the queried value does not exist on the database or the route does not exist.
- 409 (CONFLICT): whenever you try to create or edit a row in a table and the UNIQUE constraint is violated.
- 500 (INTERNAL_SERVER_ERROR): whenever the error is not any of the previous ones (wasn't caught by the [custom errors](errors)).

## Extra notes

### Notes about populating (step 4)

The URL is an argument of the populating command and not simply an environment variable so that it can be used in production as well (the script is run on your own computer not by the host). Also, it is totally safe to run it more than once because the tables are only created if they didn't exist already. However, any change to the database schema would require you to DROP the edited tables and build them again (as well as the seeding step). If the tables hold real data, back up the database and change it with ALTER TABLE instead.

### Notes about seeding (step 5)

This is only used in development, since production would use real CNG data instead. This one is also safe to run more than once, because there's a `UNIQUE` constraint for almost every table which stops the code from running.
