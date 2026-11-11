# b20-mocha

This project contains automated tests for Node.js. The tests use Mocha and Chai.

- The dMoney API tests send real HTTP requests to a dMoney server.
- The calculation tests check two small utility functions.

## Requirements

- Node.js (a version that supports ES modules)
- npm
- A running dMoney API server

## Installation

1. Clone the repository.
2. Open a terminal in the project folder.
3. Install the dependencies:

   ```bash
   npm install
   ```

## Configuration

The dMoney tests read their settings from a `.env` file.

1. Copy `.env.example` to `.env`.
2. Set the values in `.env`.

| Variable       | Description                                       | Example                 |
| -------------- | ------------------------------------------------- | ----------------------- |
| `baseUrl`      | Base URL of the dMoney API server.                | `http://localhost:5000` |
| `access_token` | Bearer token. Replace the placeholder with a token. | `<secret_bearer_token>` |

> **NOTE:** The first dMoney test logs in as admin. It replaces `access_token` with the token from the server response.

> **CAUTION:** Do not commit the `.env` file. It contains secrets. The `.gitignore` file already excludes it.

## Run the tests

Run the dMoney API tests:

```bash
npm test
```

Run the calculation tests:

```bash
npx mocha tests/calc.test.js
```

Run all tests:

```bash
npx mocha tests --timeout 10000
```

## Project structure

```text
.
├── tests/
│   ├── calc.test.js          # Tests for sum and sub
│   └── dmoney_api.test.js    # dMoney API integration tests
├── utils/
│   ├── calc.js               # sum and sub functions
│   └── randomNumber.js       # generateRandomNumber function
├── .env.example              # Template for the .env file
└── package.json
```

## Test coverage

### dMoney API (`tests/dmoney_api.test.js`)

The tests run in this order. Each test uses data from the previous test.

1. Log in as admin with correct credentials.
2. Create a new customer with random data.
3. Search for the new customer by user ID.

> **NOTE:** The tests depend on each other. If one test fails, the next tests can also fail.

### Calculation (`tests/calc.test.js`)

1. Verify that `sum(15, 5)` returns `20`.
2. Verify that `sub(15, 5)` returns `10`.

## Dependencies

| Package            | Purpose                                 |
| ------------------ | --------------------------------------- |
| `mocha`            | Test runner                             |
| `chai`             | Assertion library                       |
| `axios`            | HTTP client for API requests            |
| `@faker-js/faker`  | Generates random test data              |
| `dotenv`           | Loads variables from the `.env` file    |
