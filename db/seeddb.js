#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
INSERT INTO suppliers (name, nit, contact, address, telephone, city, email)
VALUES
  ('Panificadora Don Carlos S.A.S', '956845320-4', 'Carlos', 'Calle 34 # 42 - 81', '607 9287342', 'San Gil', 'carlos@doncarlos.com'),
  ('Alimentos La Esquina S.A.S', '301562487-5', 'Doña Rosa', 'Carrera 45 # 33 - 42', NULL, 'Bucaramanga', 'gerencia@dlaesquina.com'),
  ('La Buena Cosecha S.A.S', '685321752-2', 'Catalina', 'Calle 36 # 44 - 25', '601 9287342', 'Bogotá', 'gerente@buenacosecha.com');
`;

async function main() {
  console.log("Seeding tables...");
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

if (process.argv[2] === undefined) {
  console.log("Usage: node ./db/seeddb.js <Database URL>");
} else {
  main();
}

