const mongoose = require('mongoose');
const { uri, host, port, user, pass, db} = require('./config.json');
//main().catch(err => console.log(err));
var util            = require('util');
var fs              = require('fs');


const functionFiles = fs.readdirSync('../resources').filter(file => file.endsWith('.js'));

function Base(base){
  this.base = base;
}

Base.prototype.__defineSetter__('type',function(type){
  Object.defineProperty(this, 'constructor', {
    value: module.exports[type],
    enumarable: false
  });
  this.__proto__=module.exports[type].prototype;
});

function Init(app){
  this.app = app;
}

module.exports.Base = Base;
util.inherits(Init,Base);

Init.prototype.run = function(){
  for(const file of functionFiles){
    //load in each function
  }
  
  
}

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
