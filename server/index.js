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
//example 1

app.get("/message", cors(corsOptions), async (req, res) => {
  res.send({ message: "Hello World to meee" });
});
//eaxmple2
app.get("/cars/:id", cors(corsOptions), async (req, res) => {
  const carId = req.params["id"];

  const result = await promisePool.query(`SELECT * FROM car WHERE car_id = ?`, [
    carId,
  ]);
  if (result.error) console.log(error.message);
  const body = result[0];
  res.send(body);
});

//example3
// app.get('/cars?:make', cors(corsOptions), async (req, res) =>{
//  // app.get('/cars', cors(corsOptions), async (req, res) =>{
// const carMake = req.params.make;

// const result = await promisePool.query(`SELECT * FROM car WHERE  make =?`, [carMake,]);
// //const result = await promisePool.query(`SELECT * FROM car WHERE make = Ford`)
// if (result.error) console.log(error.message);
  
// const body = result;
// res.send(body);

// });


app.get('/cars', cors(corsOptions), async (req, res) => {

    const carMake = req.query['make'];

    const [result] = await promisePool.query(

        `SELECT * FROM car WHERE make = ? `,

        [carMake]

    );

    //const body = [result];
    const body = result;
    res.send(body);

});



app.listen(8080, () => {
  console.log(`Express web API running on port: ${PORT}.`);
});

