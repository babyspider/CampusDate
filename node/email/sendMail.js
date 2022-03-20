const {host, user, pass} = require('./config.json');

module.exports = {
	name: 			'sendMail',
	description: 	'Given arguments, this should send an email to the desired address via the email listed in config.json',
	active: 		true,
	usage: 			`Object.sendMail(recipient,subject,body,html)`,
	async execute(client, recipient, subject, body, html){
		
	}
}