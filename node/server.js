const express 	= require('express');
const app		= express();
const port 		= process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Listening to port ${port}`));

app.get('/express_backend', (req,res) =>{
	res.send({ express: 'Backend connected to React' });
});