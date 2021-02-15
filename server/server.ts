import express from "express";
import http from "http";
import webSocket from "ws";
import { evaluate } from "mathjs";
import { Pool } from "pg";

const app = express();
const server = http.createServer(app);
const webSocketServer = new webSocket.Server({ server });

let configPg = {};
if (process.env.DATABASE_URL) {
  configPg = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  configPg = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "calculator",
    max: 10,
    idleTimeoutMillis: 30000,
  };
}

const pool = new Pool(configPg);

interface IValues {
  currentValue: number;
  currentNumber: string;
  currentSymbol: "/" | "+" | "*" | "-" | null;
}

webSocketServer.on("connection", (ws) => {
  ws.on("message", (values: string) => {
    const variables: IValues = JSON.parse(values);
    const equation: string = `${variables.currentValue} ${variables.currentSymbol} ${variables.currentNumber}`;
    let answer = evaluate(equation);
    let fullEquation = `${equation} = ${answer}`;
    createSocketMessage(fullEquation).then((res) => {
      getEquations().then((allEquations) => {
        ws.send(
          JSON.stringify({ answer, history: JSON.stringify(allEquations) })
        );
        webSocketServer.clients.forEach((client) => {
          if (client !== ws) {
            client.send(
              JSON.stringify({ answer: null, history: JSON.stringify(allEquations) })
            );
          }
        });
      });
    });
  });
  getEquations().then((allEquations) => {
    ws.send(
      JSON.stringify({ answer: "", history: JSON.stringify(allEquations) })
    );
  });
});

const createSocketMessage = (equation: string) => {
  return new Promise((resolve) => {
    pool.query(
      'INSERT INTO "calculator" (equation) VALUES ($1) RETURNING id',
      [equation],
      (error, results) => {
        if (error) {
          throw error;
        }
        resolve(results.rows);
      }
    );
  });
};

const getEquations = () => {
  return new Promise((resolve) => {
    pool.query(
      'SELECT "equation" FROM "calculator" ORDER BY "created_at" DESC LIMIT 10',
      [],
      (error, results) => {
        if (error) {
          throw error;
        }
        resolve(results.rows);
      }
    );
  });
};

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT} :)`);
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
