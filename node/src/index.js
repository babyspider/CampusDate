var main		= require('./main.js');
var util		= require('util');
var Client		= require('./Client.js');

var fs			= require('fs');

const express	= require('express');
const client 	= new Client.Client();
client.commands	= new Client.Collection();

app = express();

var instance = new main.Init(client, app);
instance.run();