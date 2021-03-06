/** 
* This is our main server document
* it initializes all the functions and routes 
* for processing the users data
* it also calls the functions like email
*/

let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const createError = require('http-errors');
const matchRoute = require('../server/routes/match.routes')
const userRoute = require('../server/routes/user.routes')
const preferencesRoute = require('../server/routes/preferences.routes')
const mail      = require('./resources/sendMail.js');
mongoose
  .connect('mongodb+srv://campusdate:rpisdd2022rpisdd2022@campusdate.z8qxu.mongodb.net/campusdate?retryWrites=true&w=majority')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use('/matches', matchRoute)
app.use('/users', userRoute)
app.use('/preferences', preferencesRoute)

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})
// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});