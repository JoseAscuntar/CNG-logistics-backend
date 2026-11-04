#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
INSERT INTO clients (name, nit, contact, address, telephone, city, email, replenishment_percentage)
VALUES
  ('Donde Camilo', '902837493-3', 'Camilo', 'Calle 1 # 1 - 50', '3142653465', 'Barichara', 'camilo@dondecamilo.com', 2.0),
  ('Restaurante La Selva', '901837462-2', 'Melanie', 'Calle 14 # 23 - 76', '3184729474', 'Villa de Leyva', 'gerencia@laselva.com', 2.5),
  ('Moluscos y Crustaceos', '907467382-5', 'Sara', 'Calle 21 # 62 - 24', '3198456382', 'Tunja', 'general@moltaceos.com', 3.5);

INSERT INTO legal_entities (name, nit)
VALUES
  ('CNG', '902345678-2'),
  ('Consorcio Dios Proveerá', '908765432-2'),
  ('UT Corazón de obrero', '902346789-2');

INSERT INTO contracts (name, legal_entity_id, client_id)
VALUES
  ('Licitación New York', 1, 2),
  ('Licitación Chicago', 2, 1),
  ('Licitación Berlin', 3, 3);

INSERT INTO products (name)
VALUES
  ('Muffin'),
  ('Pan de Chocolate'),
  ('Leche');

INSERT INTO presentations (product_id, amount, unit)
VALUES
  (1, 30, 'g'),
  (1, 50, 'g'),
  (1, 70, 'g'),
  (2, 20, 'g'),
  (2, 50, 'g'),
  (3, 1000, 'ml');

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

