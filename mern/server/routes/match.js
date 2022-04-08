const express = require("express");

/** recordRoutes is an instance of the express router.
* We use it to define our routes.
* The router will be added as a middleware and will take control of requests starting with path /record.
*/
const matchRoutes = express();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section returns the matches from the db
// matchRoutes.get("/data/matches", (req, res)=> {
//   let db_connect = dbo.getDb("campusdate");
//   db_connect
//     .collection("matches")
//     .find({},{ projection:{is_match : true}})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// This section will help you get a single record by id
matchRoutes.get("/data/:id", (req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("matches")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});


// I dont think we need the following functions
// // This section will help you create a new match
// matchRoutes.route("/data/matches/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     from_email: req.body.from_email,
//     to_email: req.body.to_email,
//     is_match: req.body.is_match,
//   };
//   db_connect.collection("records").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });


// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   let newvalues = {
//     $set: {
//       person_name: req.body.person_name,
//       person_position: req.body.person_position,
//       person_level: req.body.person_level,
//     },
//   };
//   db_connect
//     .collection("records")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       response.json(res);
//     });
// });


// This section will help you delete a record
matchRoutes.delete("/data/matches/delete/:id",(req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

matchRoutes.get("/test",(res) => {
  var list = ["item1", "item2", "item3"];
  res.send(res.json(list));
  console.log('Sent list of items');
});

// matchRoutes.get('/test', (req, res) => {
//   //res.send('hello world')
//   console.log("triggered")
// });



// matchRoutes
// .route("/data")
// .get( (req,res)  => {
//   let db_connect = dbo.getDb("campusdate");
//   db_connect
//     .collection("matches")
//     .find({},{ projection:{is_match : true}})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// })
// .post( (req,res) => {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     from_email: req.body.from_email,
//     to_email: req.body.to_email,
//     is_match: req.body.is_match,
//   };
//   db_connect.collection("records").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// })
// .delete( (req,res) =>{
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     response.json(obj);
//   });
// });




module.exports = matchRoutes;