const router = require('express').Router()
let Bloodsugar = require('../models/bloodsugar.model')

router.route('/').get((req, res) => {
    Bloodsugar.find()
        .then(bloodsugar => res.json(bloodsugar))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const { firstname } = req.body
    const { level } = req.body
    const date = Date.parse(req.body.date)

    const newBloodsugar = new Bloodsugar(
        {
            firstname: firstname,
            level: level,
            date: date
        }
    )

    newBloodsugar.save()
        .then(() => res.json('Reading added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Bloodsugar.findById(req.params.id)
        .then(bloodsugar => res.json(bloodsugar))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Bloodsugar.findByIdAndDelete(req.params.id)
        .then(() => res.json('Reading deleted!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Bloodsugar.findById(req.params.id)
    .then(bloodsugar => {
        bloodsugar.firstname = req.body.firstname
        bloodsugar.level = req.body.level
        bloodsugar.date = Date.parse(req.body.date)

        bloodsugar.save()
            .then(() => res.json('Reading updated!'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router