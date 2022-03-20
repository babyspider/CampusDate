/*
//Connection URL
const {uri} = require('./config.json');

//Client
const client = new MongoClient(uri,
	{
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		}
	});


async function run() {
  try {
    // Connect the client to the server
    console.log("Connecting");
    await client.connect();
    console.log("Connecting to database");
    // Establish and verify connection
    await client.db("campusdate").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Connection closed");
    await client.close();
  }
}

//run();
//console.log("Test");
*/
/*const { MongoClient, ServerApiVersion } = require("mongodb");
const mongodb = require("mongo-ssh");

async function init(){
  let connection;
  let collections = [];
  let databases = [];
  try {
    //Configure connection
    connection = await mongodb.connect(
      {
        host: `${host}`,
        port: 220,
        user: `${user}`,
        password: `${pass}`,
      },
      {
        host: "127.0.0.1",
        port: 27017,
        user: "campusdate",
        password: `${pass}`,
        database: `${db}`
      }
    );

    databases = await connection.client.db("root").admin().listDatabases();
    await connection.client.db(`${db}`).listCollections().toArray()
      .then(data=>{
        data.forEach(item => collections.push(item.name));
      }).catch(err=>{
        console.error("Database read error.");
        throw err;
      });
      console.log("Databases: ",databases);
      console.log("Collections: ",collections);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        throw err;
      }
    }
  }
}*/

//init();

const mongoose = require('mongoose');
const { uri, host, port, user, pass, db} = require('./config.json');
main().catch(err => console.log(err));

async function main() {

  console.log("Connecting.");
  //const conn = mongoose.createConnection(`mongodb://${user}:${pass}@apollo.arcator.co.uk:220/campusdate`)
  mongoose.connect(`mongodb://${user}:${pass}@apollo.arcator.co.uk:220/campusdate`)
    .catch(error => handleError(error));
  //await mongoose.connect(`mongodb://${user}:${pass}@apollo.arcator.co.uk:220/campusdate`)
  console.log("Connected.");
  //const userSchema = new Schema({ name: String, email: String});
  //module.exports = userSchema;
  //const UserModel = conn.model('campusdate', userSchema);

}
