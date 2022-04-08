//This is the middleware that connects the preferences via routing

let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let preferences = require('../models/preferences-schema');

router.post('/create', async(req, res) => {
    const newPref = new preferences(req.body);
    newPref
    .save()
    .then(() => res.json("New match created!"))    
});

//Gets the predereces from the Preference Collection 
router.route('/').get((req, res) => {
    preferences.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/find/:email').get((req, res) => {
    preferences.find({email: req.params.email}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
//Creates a preference in the Preference Collection
router.route('/create').post((req, res, next) => {
    preferences.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});
//Edits a preference in the Prefernce Collection
router.route('/edit/:id').get((req, res) => {
    preferences.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
//Updates a preference in the Preference Collection
router.route('/update/:id').put((req, res, next) => {
    preferences.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('preferences updated successfully !')
        }
    })
})
//Deletes a preference in the Preference Collection
router.route('/delete/:id').delete((req, res, next) => {
    preferences.findByIdAndRemove(req.params.id, (error, data) => {
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