let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let mail = require('../resources/sendMail.js');

let users = require('../models/user-schema');
router.route('/create').post((req, res, next) => {
    users.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

router.route('/').get((req, res) => {
    users.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.post('/register', function(req,res) {
    var recipient = req.body.recipient.toString();
    mail.execute(recipient,"Confirmation Code for CampusDate","Hi New User, \nWe are so excited to have you join our community of college students who are looking for love. In order to verify that you are actually a college student, we have sent you this verification code: "+4453+". This is one step we take to create a safer more transparent communiy. \nWe hope you enjoy and find love, \nThe CampusDate Team <3");
});

router.route('/get/:email').get((req, res) => {
    users.find({email: req.params.email}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/edit/:id').get((req, res) => {
    users.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/update/:id').put((req, res, next) => {
    users.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('users updated successfully !')
        }
    })
})
router.route('/delete/:id').delete((req, res, next) => {
    users.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
module.exports = router;