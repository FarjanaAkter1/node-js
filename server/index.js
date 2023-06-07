const cors = require("cors");
const express = require("express");
const { body, check, param, validationResult } = require("express-validator");

const promisePool = require("../promisePool").Pool;

const PORT = 8080;
const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

// Middleware...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your endpoints here..

app.get("/message", cors(corsOptions), async (req, res) => {
  res.send({ message: "Hello World to meee" });
});

app.get("/cars/:id", cors(corsOptions), async (req, res) => {
  //const carId = req.params["id"];

  // const result = await promisePool.query(`SELECT * FROM car WHERE car_id = ?`, [

  //   carId,
  // ]);
  const result = await promisePool.query(`SELECT * FROM car WHERE car_id = 1`)
 if (result.error) 
 console.log (error.message)
  const body = result[0];
  res.send(body);
});

app.listen(8080, () => {
  console.log(`Express web API running on port: ${PORT}.`);
});
