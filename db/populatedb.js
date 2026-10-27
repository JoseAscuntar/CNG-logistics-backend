#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(10) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,

  CONSTRAINT valid_roles CHECK (role IN ('auditor', 'operator'))
);

CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  nit VARCHAR(20) NOT NULL UNIQUE,
  address VARCHAR(100) NOT NULL,
  contact VARCHAR(100) NOT NULL,
  replenishment_percentage DECIMAL NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS legal_entities (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  nit VARCHAR(20) NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS contracts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  legal_entity_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,

  CONSTRAINT contracts_to_legal_entity FOREIGN KEY (legal_entity_id) REFERENCES legal_entities(id),
  CONSTRAINT contracts_to_client FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS presentations (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  unit VARCHAR(10) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,

  CONSTRAINT valid_units CHECK (unit IN ('g', 'ml', 'lb')),
  CONSTRAINT presentations_to_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  nit VARCHAR(20) NOT NULL UNIQUE,
  contact VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  telephone VARCHAR(20),
  city VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS supplier_presentations (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  supplier_id INTEGER NOT NULL,
  presentation_id INTEGER NOT NULL,
  buying_price INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,

  CONSTRAINT supplier_presentations_to_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  CONSTRAINT supplier_presentations_to_presentation FOREIGN KEY (presentation_id) REFERENCES presentations(id),
  CONSTRAINT unique_supplier_presentation UNIQUE (supplier_id, presentation_id)
);

CREATE TABLE IF NOT EXISTS presentation_contracts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  presentation_id INTEGER NOT NULL,
  contract_id INTEGER NOT NULL,
  selling_price INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,

  CONSTRAINT presentation_contracts_to_presentation FOREIGN KEY (presentation_id) REFERENCES presentations(id),
  CONSTRAINT presentation_contracts_to_contract FOREIGN KEY (contract_id) REFERENCES contracts(id),
  CONSTRAINT unique_presentation_contract UNIQUE (presentation_id, contract_id)
);

CREATE TABLE IF NOT EXISTS change_requests (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  requested_by INTEGER NOT NULL,
  requested_at TIMESTAMP NOT NULL DEFAULT NOW(),
  entity VARCHAR(30) NOT NULL,
  entity_id INTEGER,
  action VARCHAR(20) NOT NULL,
  new_value TEXT NOT NULL,
  old_value TEXT,
  status VARCHAR(20) NOT NULL,
  decided_by INTEGER,
  decided_at TIMESTAMP,
  reason TEXT,

  CONSTRAINT valid_entities CHECK (entity IN ('users', 'suppliers', 'products', 'presentations', 'clients', 'contracts', 'legal_entities', 'supplier_presentations', 'presentation_contracts')),
  CONSTRAINT valid_actions CHECK (action IN ('create', 'edit', 'deactivate', 'reactivate')),
  CONSTRAINT valid_statuses CHECK (status IN ('pending', 'approved', 'rejected')),
  CONSTRAINT change_requests_to_user_request FOREIGN KEY (requested_by) REFERENCES users(id),
  CONSTRAINT change_requests_to_user_decision FOREIGN KEY (decided_by) REFERENCES users(id)
);
`;

async function main() {
  console.log("Creating tables...");
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

if (process.argv[2] === undefined) {
  console.log("Usage: node ./db/populatedb.js <Database URL>");
} else {
  main();
}
