const express 	= require('express');
const app		= express();
const port 		= process.env.PORT || 5000;

const mail 		= require('./resources/sendMail.js');

app.listen(port, ()=>console.log(`Listening to port ${port}`));

app.get('/express_backend', (req,res) =>{
	res.send({ express: 'Backend connected to React' });
});

app.post('/resources/mail', function(req,res) {
	var recipient = req.body.recipient.toString();
	var subject = req.body.subject.toString();
	var body = req.body.body.toString();

	res.send('POST request to sendMail');
	mail.execute(recipient,subject,body);
});