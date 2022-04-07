let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let match = require('../models/match-schema');

router.post('/create/:femail/:temail/:isMatch', (req, res) => {
    const newMatch = new match({from_email: req.params.femail,
                                to_email: req.params.temail,
                                is_match: req.params.isMatch})
    newMatch
    .save()
    .then(() => res.json("New match created!"))    
});

router.route('/').get((req, res) => {
    match.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
router.route('/edit/:id').get((req, res) => {
    match.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/update/:id').put((req, res, next) => {
    match.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('match updated successfully !')
        }
    })
})
router.route('/delete/:id').delete((req, res, next) => {
    match.findByIdAndRemove(req.params.id, (error, data) => {
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