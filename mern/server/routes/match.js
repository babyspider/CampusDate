const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const matchRoutes = express();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


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

// This section is test page for record access
matchRoutes.get("/test",(res) => {
  var list = ["item1", "item2", "item3"];
  res.send(res.json(list));
  console.log('Sent list of items');
});




module.exports = matchRoutes;