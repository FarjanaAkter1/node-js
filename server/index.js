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

//////Example4


// app.post('/cars/', cors(corsOptions), async (req, res) => {
//   const {make , model,color ,price } = req.body

// // try{
//   const [result] = await promisePool.query (`
//   INSERT INTO car (make, model, color, price)
//   VALUES (?, ?, ?, ?)
// `, [make, model, color, price]);

//   const body = result;
//   res.send =(body) 

// // }catch (error) {
// //   console.log(error);
// //   res.status(500).json({ error: 'Failed to add car' });
// // }
 
// })
/////Example 4

app.post('/cars', cors(corsOptions), async (req, res) => {

  //Destructuring req.body

  const { make, model, color, price } = req.body;

  //Query to insert car on table

  const insertCar = await promisePool.query(

      `INSERT INTO car (make, model, price, color) VALUES (?,?,?,?)`,

      [make, model, price, color]

  );

  //Getting the Id from the newly inserted item

  const carId = insertCar[0].insertId;




  // Query to return the newly inserted item

  const [carInserted] = await promisePool.query(

      `SELECT * FROM car WHERE car_id = ? `,

      [carId]

  );

  res.send(carInserted);

});



app.listen(PORT, () => {
  console.log(`Express web API running on port: ${PORT}.`);
});

