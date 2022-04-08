let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let preferences = require('../models/preferences-schema');
// router.route('/create').post((req, res, next) => {
//     preferences.create(req.body, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             console.log(data)
//             res.json(data)
//         }
//     })
// });

router.post('/create', async(req, res) => {
    // console.log(req.body);
    const newPref = new preferences(req.body);
    newPref
    .save()
    .then(() => res.json("New match created!"))    
});

// 
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

// router.route('/findfor/:email').get((req, res) => {
//     preferences.find({email: req.params.email}, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })

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

router.route('/edit/:id').get((req, res) => {
    preferences.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

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